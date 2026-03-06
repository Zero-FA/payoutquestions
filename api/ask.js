const fs = require("fs");
const path = require("path");
const OpenAIImport = require("openai");

const OpenAI = OpenAIImport.default || OpenAIImport;

/*
FAQ support article links
*/
const FAQ_LINKS = {
  "EOD-Drawdown-Explained.txt": {
    title: "EOD Drawdown Explained",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/45631563363483-EOD-Drawdown-Explained"
  },

  "EOD-Evals.txt": {
    title: "EOD Evaluations",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/46724640813083-EOD-Evaluations"
  },

  "EOD-Performance-Accounts.txt": {
    title: "EOD Performance Accounts",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/47204516592795-EOD-Performance-Accounts-PA"
  },

  "Intraday-Trailing-Drawdown-Evaluations.txt": {
    title: "Intraday Trailing Drawdown Evaluations",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/45683414022299-Intraday-Trailing-Drawdown-Evaluations"
  },

  "Intraday-Trailing-Drawdown-Explained.txt": {
    title: "Intraday Trailing Drawdown Explained",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/45683513113115-Intraday-Trailing-Drawdown-Explained"
  },

  "Intraday-Trailing-Drawdown-Performance-Accounts.txt": {
    title: "Intraday Trailing Drawdown Performance Accounts",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/47206242141979-Intraday-Trailing-Drawdown-Performance-Accounts-PA"
  },

  "2FA.txt": {
    title: "Setting Up Two-Factor Authentication (2FA)",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/38540816253723-Setting-Up-Two-Factor-Authentication-2FA"
  },

  "Dashboard.txt": {
    title: "Apex Trader Funding Dashboard",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/31519379778459-Apex-Trader-Funding-Dashboard"
  },

  "Prohibited.txt": {
    title: "Prohibited Activities",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/40463668243099-Prohibited-Activities"
  },

  "Registering.txt": {
    title: "Registering as a Person or Business",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/44603582630683-Registering-as-a-Person-or-Business"
  },

  "Restricted-Countries.txt": {
    title: "Restricted Countries",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/31519369083803-Restricted-Countries"
  }
};

/*
Recursively load FAQ files from nested folders
*/
function getAllFiles(dirPath, arrayOfFiles = []) {

  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {

    const fullPath = path.join(dirPath, file);

    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    }

    else if (file.endsWith(".txt")) {
      arrayOfFiles.push(fullPath);
    }

  });

  return arrayOfFiles;
}


/*
Load FAQ text into one prompt
*/
function loadFaqs() {

  const faqDir = path.join(process.cwd(), "faqs");

  if (!fs.existsSync(faqDir)) {
    throw new Error(`FAQ folder missing: ${faqDir}`);
  }

  const files = getAllFiles(faqDir);

  if (!files.length) {
    throw new Error(`No FAQ .txt files found`);
  }

  let faqText = "";

  for (const filePath of files) {

    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath, "utf8");

    faqText += `

### FILE: ${fileName}

${content}

`;

  }

  return faqText;
}


/*
API handler
*/
module.exports = async function handler(req, res) {

  try {

    if (req.method !== "POST") {
      return res.status(200).json({
        ok: true,
        message: "API route is alive. Send POST request."
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY environment variable");
    }

    const body = req.body || {};
    const question = (body.question || "").trim();

    if (!question) {
      return res.status(400).json({
        ok: false,
        error: "Missing question"
      });
    }

    const faqText = loadFaqs();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      temperature: 0.2,

      input: [

        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: `You are an Apex Trader Funding support assistant.

Follow these rules strictly:

1. Answer ONLY using the FAQ documentation provided.
2. Do NOT use outside knowledge.
3. Do NOT guess.
4. If the answer is not clearly in the FAQ say:

"I can't answer that from the provided Apex payout FAQs."

5. Match the tone of the user's question.
6. Keep the answer clear and direct.

After answering, add a final line:

SourceFile: <filename>

Use the best matching FAQ file.`
            }
          ]
        },

        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `FAQ DOCUMENTATION:

${faqText}

USER QUESTION:
${question}

Answer using only the FAQ documentation above.`
            }
          ]
        }

      ]
    });


    let rawAnswer =
      (response.output_text && response.output_text.trim()) ||
      "I can't answer that from the provided Apex payout FAQs.";


    /*
    Extract source file
    */

    const sourceMatch = rawAnswer.match(/SourceFile:\s*(.+)$/im);
    const sourceFile = sourceMatch ? sourceMatch[1].trim() : "";

    const cleanedAnswer = rawAnswer
      .replace(/SourceFile:\s*.+$/im, "")
      .trim();


    let finalAnswer = cleanedAnswer;

    const sourceInfo = FAQ_LINKS[sourceFile];


    if (sourceInfo) {

      finalAnswer += `

Source: ${sourceInfo.title}
Link: ${sourceInfo.url}`;

    }

    else if (sourceFile) {

      finalAnswer += `

Source: ${sourceFile}`;

    }


    return res.status(200).json({
      ok: true,
      answer: finalAnswer
    });


  }

  catch (error) {

    console.error("ASK API ERROR:", error);

    return res.status(500).json({
      ok: false,
      error: error && error.message ? error.message : "Unknown server error"
    });

  }

};
