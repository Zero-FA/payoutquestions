const OpenAIImport = require("openai");

const OpenAI = OpenAIImport.default || OpenAIImport;

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
  },
  "eod-payouts.txt": {
    title: "EOD Payouts",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/47205823183003-EOD-Payouts"
  },
  "intraday-payouts.txt": {
    title: "Intraday Trailing Drawdown Payouts",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/47206370796827-Intraday-Trailing-Drawdown-Payouts"
  },
  "us-payout-method.txt": {
    title: "Payout Method — US-Based Users",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/40509699096347-Payout-Method-US-Based-Users"
  },
  "inter-payout-method.txt": {
    title: "Payout Method — International Users",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/40510461359131-Payout-Method-International-Users"
  },
  "payout-method-info.txt": {
    title: "Payout Method Information",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/18960740219931-Payout-Method-Information"
  },
  "howto-request.txt": {
    title: "How to Request a Payout",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/46884326359579-How-to-Request-a-Payout"
  },
  "Evaluation-Plan-Fees-and-Access-Explained.txt": {
    title: "Evaluation Plan Fees and Access Explained",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/46723099925403-Evaluation-Plan-Fees-and-Access-Explained"
  },
  "PA-Activation-Process-&-Deadline-Explained.txt": {
    title: "PA Activation Process & Deadline Explained",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/47237215800987-PA-Activation-Process-Deadline-Explained"
  },
  "Payment-Methods-and-Possible-Checkout-Errors.txt": {
    title: "Payment Methods and Possible Checkout Errors",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/43481854699547-Payment-Methods-and-Possible-Checkout-Errors"
  },
  "Inactivity-Policy-on-Performance-Accounts.txt": {
    title: "Inactivity Policy on Performance Accounts",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/47259602019611-Inactivity-Policy-on-Performance-Accounts-PA"
  },
  "Coupon-Codes.txt": {
    title: "Coupon Codes",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/43190509217179-Coupon-Codes"
  },
  "Refund-Policy.txt": {
    title: "Refund Policy",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/47255392198299-Refund-Policy"
  },
  "WealthCharts-Setup-and-Connection.txt": {
    title: "WealthCharts Setup and Connection",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/31519768019611-WealthCharts-Setup-and-Connection"
  },
  "Common Questions-and-Troubleshooting-for-WealthCharts.txt": {
    title: "Common Questions and Troubleshooting for WealthCharts",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/31137137544475-Common-Questions-and-Troubleshooting-for-WealthCharts"
  },
  "Rithmic-Account-Setup.txt": {
    title: "Rithmic Account Setup",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/31519440985499-Rithmic-Account-Setup"
  },
  "Connection-Guide-for-NinjaTrader-Using-Rithmic.txt": {
    title: "Connection Guide for NinjaTrader Using Rithmic",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/13397375485851-Connection-Guide-for-NinjaTrader-Using-Rithmic"
  },
  "Rithmic-Troubleshooting.txt": {
    title: "Rithmic Troubleshooting",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/31519409430811-Rithmic-Troubleshooting-Lag-Error-Messages"
  },
  "Setting-up-Tradovate.txt": {
    title: "Setting up Tradovate",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/31519502179099-Setting-up-Tradovate"
  },
  "Tradovate-NinjaTrader8-Connection.txt": {
    title: "Tradovate x NinjaTrader8 Connection Guide",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/43191997568667-Tradovate-x-NinjaTrader8-Connection-Guide"
  },
  "Tradovate-Frequently-Asked-Questions.txt": {
    title: "Tradovate Frequently Asked Questions",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/31519503465755-Tradovate-Frequently-Asked-Questions"
  },
  "Rithmic-Commissions-&-Instruments.txt": {
    title: "Rithmic Commissions & Instruments",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/31519472976155-Rithmic-Commissions-Instruments"
  },
  "WealthCharts-Commissions-&-Instruments.txt": {
    title: "WealthCharts Commissions & Instruments",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/40229823264411-WealthCharts-Commissions-Instruments"
  },
  "Tradovate-Commission-&-Instruments.txt": {
    title: "Tradovate Commission & Instruments",
    url: "https://support.apextraderfunding.com/hc/en-us/articles/31519458697243-Tradovate-Commission-Instruments"
  }
};

function normalizeQuestion(input) {
  let q = ` ${input || ""} `;

  const replacements = [
    [/\btdv\b/gi, " Tradovate "],
    [/\btradovate\b/gi, " Tradovate "],
    [/\brith\b/gi, " Rithmic "],
    [/\brithmic\b/gi, " Rithmic "],
    [/\bwc\b/gi, " WealthCharts "],
    [/\bwealth charts\b/gi, " WealthCharts "],
    [/\bwealthcharts\b/gi, " WealthCharts "],
    [/\bnt\b/gi, " NinjaTrader "],
    [/\bnt8\b/gi, " NinjaTrader8 "],
    [/\bninjatrader\b/gi, " NinjaTrader "],
    [/\bninjatrader 8\b/gi, " NinjaTrader8 "],
    [/\bpa\b/gi, " Performance Account "],
    [/\bpas\b/gi, " Performance Accounts "],
    [/\beval\b/gi, " Evaluation "],
    [/\bevals\b/gi, " Evaluations "],
    [/\b2fa\b/gi, " Two-Factor Authentication "],
    [/\bach\b/gi, " ACH "],
    [/\bes\b/gi, " ES E-Mini S&P 500 "],
    [/\bmes\b/gi, " MES Micro E-Mini S&P 500 "],
    [/\bnq\b/gi, " NQ E-Mini Nasdaq "],
    [/\bmnq\b/gi, " MNQ Micro E-Mini Nasdaq "],
    [/\byt\b/gi, " Treasury Note "],
    [/\bym\b/gi, " YM E-Mini Dow "],
    [/\bmym\b/gi, " MYM Micro E-Mini Dow "],
    [/\brt\b/gi, " round turn "],
    [/\br\/t\b/gi, " round turn "],
    [/\beod\b/gi, " End of Day EOD "],
    [/\bttd\b/gi, " trailing drawdown "],
    [/\bdd\b/gi, " drawdown "],
    [/\bunder review\b/gi, " under review payout status "],
    [/\bpaid\b/gi, " paid payout status "],
    [/\bmaen\b/gi, " mean "],
    [/\bpayouts\b/gi, " payout requests payouts "],
    [/\bpay out\b/gi, " payout "],
    [/\bhow many\b/gi, " number of amount of total allowed "],
    [/\bcan i request\b/gi, " request allowed eligible "],
    [/\brequests\b/gi, " requests request "],
    [/\bqeustion\b/gi, " question "],
    [/\bdo ont\b/gi, " do not "],
    [/\bcahnge\b/gi, " change "],
    [/\birt\b/gi, " it "],
    [/\bplesae\b/gi, " please "]
  ];

  for (const [pattern, replacement] of replacements) {
    q = q.replace(pattern, replacement);
  }

  return q.replace(/\s+/g, " ").trim();
}

function uniqueStrings(items) {
  return [...new Set(items.map((x) => String(x || "").trim()).filter(Boolean))];
}

function buildQueryVariants(rawQuestion, normalizedQuestion) {
  const variants = [rawQuestion, normalizedQuestion];
  const lower = normalizedQuestion.toLowerCase();

  if (lower.includes("payout")) {
    variants.push(
      `${normalizedQuestion} payout requests`,
      `${normalizedQuestion} how many payout requests allowed`,
      `${normalizedQuestion} maximum number of payout requests`,
      `payout request limit ${normalizedQuestion}`,
      `how many payouts can i request`
    );
  }

  if (lower.includes("under review")) {
    variants.push(
      `${normalizedQuestion} meaning`,
      `what does under review mean`,
      `under review payout status meaning`
    );
  }

  if (lower.includes("tradovate")) {
    variants.push(`tradovate ${normalizedQuestion}`);
  }

  if (lower.includes("rithmic")) {
    variants.push(`rithmic ${normalizedQuestion}`);
  }

  if (lower.includes("wealthcharts")) {
    variants.push(`wealthcharts ${normalizedQuestion}`);
  }

  return uniqueStrings(variants).slice(0, 8);
}

async function searchVectorStore({ vectorStoreId, apiKey, queries, maxResults = 8 }) {
  const allResults = [];

  for (const query of queries) {
    const response = await fetch(`https://api.openai.com/v1/vector_stores/${vectorStoreId}/search`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        max_num_results: maxResults,
        rewrite_query: true,
        ranking_options: {
          ranker: "auto",
          score_threshold: 0.45
        }
      })
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json && json.error && json.error.message ? json.error.message : "Vector store search failed");
    }

    const results = Array.isArray(json.data) ? json.data : [];
    for (const item of results) {
      allResults.push({
        ...item,
        search_query: query
      });
    }
  }

  const deduped = new Map();

  for (const item of allResults) {
    const contentText = Array.isArray(item.content)
      ? item.content.map((c) => c && c.text ? c.text : "").join("\n").trim()
      : "";

    const key = `${item.filename || ""}::${contentText}`;
    const existing = deduped.get(key);

    if (!existing || (item.score || 0) > (existing.score || 0)) {
      deduped.set(key, {
        filename: item.filename || "",
        file_id: item.file_id || "",
        score: typeof item.score === "number" ? item.score : 0,
        contentText,
        search_query: item.search_query || ""
      });
    }
  }

  return [...deduped.values()]
    .filter((x) => x.contentText)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

function buildFaqContext(results) {
  return results
    .map((item, index) => {
      return [
        `### RESULT ${index + 1}`,
        `Filename: ${item.filename}`,
        `Score: ${item.score}`,
        `MatchedQuery: ${item.search_query}`,
        `Chunk:`,
        item.contentText
      ].join("\n");
    })
    .join("\n\n");
}

function pickBestSource(results, cleanedAnswer) {
  if (!results.length) return null;
  if (!cleanedAnswer || isNoAnswer(cleanedAnswer)) return null;

  const answerLower = cleanedAnswer.toLowerCase();

  for (const result of results) {
    const chunkLower = result.contentText.toLowerCase();
    if (chunkLower.includes(answerLower.slice(0, Math.min(answerLower.length, 80)))) {
      return result;
    }
  }

  return results[0];
}

function isNoAnswer(text) {
  const value = String(text || "").toLowerCase();
  return (
    !value ||
    value.includes("i can't answer that from the provided apex faqs") ||
    value.includes("i cannot answer that from the provided apex faqs") ||
    value.includes("not found in the faq") ||
    value.includes("not in the faq") ||
    value.includes("not clearly supported")
  );
}

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

    if (!process.env.OPENAI_VECTOR_STORE_ID) {
      throw new Error("Missing OPENAI_VECTOR_STORE_ID environment variable");
    }

    const body = req.body || {};
    const rawQuestion = String(body.question || "").trim();

    if (!rawQuestion) {
      return res.status(400).json({
        ok: false,
        error: "Missing question"
      });
    }

    const normalizedQuestion = normalizeQuestion(rawQuestion);
    const queryVariants = buildQueryVariants(rawQuestion, normalizedQuestion);

    const searchResults = await searchVectorStore({
      vectorStoreId: process.env.OPENAI_VECTOR_STORE_ID,
      apiKey: process.env.OPENAI_API_KEY,
      queries: queryVariants,
      maxResults: 8
    });

    const highConfidenceResults = searchResults.filter((x) => x.score >= 0.5);
    const chosenResults = highConfidenceResults.length ? highConfidenceResults.slice(0, 6) : searchResults.slice(0, 6);
    const faqContext = buildFaqContext(chosenResults);

    if (!faqContext.trim()) {
      return res.status(200).json({
        ok: true,
        answer: "I can't answer that from the provided Apex FAQs.",
        sourceFile: "",
        sourceTitle: "",
        sourceUrl: "",
        normalizedQuestion,
        selectedFiles: [],
        queryVariants
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-5",
      reasoning: { effort: "medium" },
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: `You are an Apex Trader Funding FAQ assistant.

Rules:
1. Answer ONLY using the retrieved FAQ chunks provided.
2. Do NOT use outside knowledge.
3. Do NOT guess.
4. If the answer is not clearly supported by the retrieved FAQ chunks, say exactly:
I can't answer that from the provided Apex FAQs.
5. Keep the answer short, direct, and natural.
6. Do NOT mention filenames, chunk scores, vector stores, retrieval, or internal process.
7. Do NOT add a source line, label, or citation in the answer.`
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `ORIGINAL USER QUESTION:
${rawQuestion}

NORMALIZED QUESTION:
${normalizedQuestion}

QUERY VARIANTS USED:
${queryVariants.join("\n")}

RETRIEVED FAQ CHUNKS:
${faqContext}

Answer using only the retrieved FAQ chunks above.`
            }
          ]
        }
      ]
    });

    const cleanedAnswer = ((response.output_text && response.output_text.trim()) || "I can't answer that from the provided Apex FAQs.").trim();
    const bestSource = pickBestSource(chosenResults, cleanedAnswer);
    const sourceFile = bestSource && !isNoAnswer(cleanedAnswer) ? bestSource.filename : "";
    const sourceInfo = sourceFile ? (FAQ_LINKS[sourceFile] || null) : null;

    return res.status(200).json({
      ok: true,
      answer: cleanedAnswer,
      sourceFile,
      sourceTitle: sourceInfo ? sourceInfo.title : "",
      sourceUrl: sourceInfo ? sourceInfo.url : "",
      normalizedQuestion,
      selectedFiles: uniqueStrings(chosenResults.map((x) => x.filename)),
      queryVariants
    });
  } catch (error) {
    console.error("ASK API ERROR:", error);

    return res.status(500).json({
      ok: false,
      error: error && error.message ? error.message : "Unknown server error"
    });
  }
};
