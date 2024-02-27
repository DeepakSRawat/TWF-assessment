const express = require("express");
const bodyParser = require("body-parser");
const { translate } = require("free-translate");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// Translation endpoint
app.post("/translate", async (req, res) => {
  try {
    // Check if 'text' key exists in the request body
    if (!req.body.text) {
      return res
        .status(400)
        .json({ error: "Missing 'text' key in the request body" });
    }

    const textToTranslate = req.body.text;

    // Translate the text from English to French
    const translation = await translate(textToTranslate, {
      from: "en",
      to: "fr",
    });

    // Respond with translated text
    res.json({
      translation: translation,
    });
  } catch (error) {
    console.error("Error during translation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
