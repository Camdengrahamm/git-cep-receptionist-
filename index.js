const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const message = req.body.message || "";
  const intent = detectIntent(message); // Basic keyword match

  const routing = {
    golf: "sip:101@yourclub.com",
    membership: "sip:102@yourclub.com",
    fnb: "sip:103@yourclub.com",
    accounting: "sip:104@yourclub.com"
  };

  const extension = routing[intent];
  if (extension) {
    return res.json({
      action: {
        type: "transfer",
        phoneNumber: extension
      }
    });
  }

  return res.json({ reply: "Can you please clarify what you're calling about?" });
});

function detectIntent(text) {
  const lower = text.toLowerCase();
  if (lower.includes("golf")) return "golf";
  if (lower.includes("membership") || lower.includes("join")) return "membership";
  if (lower.includes("food") || lower.includes("order") || lower.includes("restaurant")) return "fnb";
  if (lower.includes("bill") || lower.includes("account")) return "accounting";
  return null;
}

app.listen(3000, () => console.log('Server running on port 3000'));
