# ScamSense

A simple web-based tool that analyses text messages for common scam warning signs and assigns a risk score.

**Live demo:** https://hamzahafeezshaikh0-ui.github.io/ScamSense/

## Overview

ScamSense lets a user paste a suspicious message into a webpage and receive:
- A risk category: No Risk, Low Risk, Medium Risk, or High Risk
- A score out of 100
- A list of warning signs detected in the message

The project is built with HTML, CSS, and vanilla JavaScript. It uses pattern matching and a weighted rule-based scoring system; it does not currently use an AI or machine-learning model.

## Features

- Detects wording associated with urgency and pressure
- Looks for messages impersonating banks, government departments, delivery companies, and other organisations
- Flags requests involving money, payments, passwords, PINs, and one-time passcodes (OTPs)
- Recognises selected URL-shortening domains
- Explains which warning signs contributed to the result
- Handles empty input with a clear validation message
- Responsive page layout for different screen sizes

## How the scoring works

ScamSense checks the message against five groups of patterns:

| Signal category | Weight |
| --- | ---: |
| Urgency | 15 |
| Impersonation | 15 |
| Financial requests | 30 |
| Credential requests | 30 |
| Shortened URLs | 25 |

The score is the sum of the weights for the detected categories. If a message contains both a credential request and impersonation signal, an additional 20 points are added. The final score is capped at 100.

| Score | Result |
| ---: | --- |
| 0 | No Risk |
| 1–29 | Low Risk |
| 30–59 | Medium Risk |
| 60–100 | High Risk |

A result of **No Risk** only means that none of the current rules matched. It does not prove that a message is safe.

## Example checks

| Example message | Expected result |
| --- | --- |
| Your bank account is suspended! Act immediately and share your OTP. | 80 — High Risk |
| Your package is delayed. Track it here: https://bit.ly/track123 | 25 — Low Risk |
| Transfer money to this account immediately. | 30 — Medium Risk |
| Hey! Are we still meeting for lunch tomorrow? | 0 — No Risk |

## Run locally

1. Clone this repository:
   ```bash
   git clone https://github.com/hamzahafeezshaikh0-ui/ScamSense.git
   ```
2. Open the `ScamSense` folder in your code editor.
3. Open `index.html` in a browser, or use the Live Server extension in Visual Studio Code.

No package installation or build step is required.

## Project structure

```text
ScamSense/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Technology

- **HTML** — page structure
- **CSS** — layout and styling
- **JavaScript** — pattern matching, risk scoring, and result display

## Limitations and future improvements

This is an educational prototype, not a complete scam-detection or cybersecurity service. Its results depend on a limited set of predefined text patterns and URL-shortening domains. It may miss scams that use different wording, and legitimate messages may sometimes match a rule.

Possible next improvements:
- Expand and refine detection patterns
- Detect and inspect URLs more comprehensively
- Add a larger collection of test messages
- Explore machine-learning-based classification and evaluate it against a labelled dataset

## Disclaimer

ScamSense provides an initial warning based on predefined rules. Do not rely on its score alone to decide whether a message, link, or sender is trustworthy. Never share passwords, PINs, or OTPs in response to an unsolicited message.
