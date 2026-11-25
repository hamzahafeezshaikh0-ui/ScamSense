
const input = document.querySelector("#messageInput");
const button = document.querySelector("#analyzeButton");
const result = document.querySelector("#result");

// Detection rules
const detectionRules = {
    urgency: {
        weight: 15,
        patterns: [
            /act immediately/i,
            /within \d+ hours/i,
            /account suspended/i,
            /urgent action required/i,
            /limited time/i
        ]
    },
    impersonation: {
        weight: 15,
        patterns: [
            /your bank/i,
            /government department/i,
            /customs department/i,
            /delivery company/i,
            /tax authority/i
        ]
    },
    financial: {
        weight: 30,
        patterns: [
            /transfer money/i,
            /send payment/i,
            /gift card/i,
            /crypto(currency)?/i,
            /pay immediately/i
        ]
    },

    credentials: {
        weight: 30,
        patterns: [
            /share your otp/i,
            /provide your password/i,
            /enter your pin/i,
            /verify your account/i,
            /share your verification code/i
        ]
    },

    urls: {
        weight: 25,
        patterns: [
            /bit\.ly/i,
            /tinyurl\.com/i,
            /t\.co/i,
            /is\.gd/i,
            /cutt\.ly/i,
            /rb\.gy/i
        ]
    }
};

// Detect suspicious signals
function detectSignals(message) {
    const findings = [];

    for (const [category, rule] of Object.entries(detectionRules)) {
        for (const pattern of rule.patterns) {
            if (pattern.test(message)) {
                findings.push({
                    category: category,
                    weight: rule.weight,
                    matchedPattern: pattern.source
                });

                break;
            }
        }
    }

    return findings;
}

// Calculate risk
const explanations = {
    urgency: "Creates pressure to act immediately.",
    impersonation: "Pretends to represent a trusted organization.",
    financial: "Attempts to obtain money or payments.",
    credentials: "Requests sensitive information such as passwords or OTPs.",
    urls: "Contains a link from a URL-shortening service."
};
function calculateRisk(findings) {
    let score = 0;

    // Add individual category weights
    for (const finding of findings) {
        score += finding.weight;
    }

    // Check for specific combinations
    const hasCredentials = findings.some(
        finding => finding.category === "credentials"
    );

    const hasImpersonation = findings.some(
        finding => finding.category === "impersonation"
    );

    // Add bonus risk for combined signals
    if (hasCredentials && hasImpersonation) {
        score += 20;
    }

    // Cap score at 100
    score = Math.min(score, 100);

    // Determine risk level
    let level;

    if (score >= 60) {
    level = "High Risk";
    } else if (score >= 30) {
        level = "Medium Risk";
    } else if (score > 0) {
        level = "Low Risk";
    } else {
        level = "No Risk";
    }

    return {
        score: score,
        level: level
    };
}

// Button event
// Button event
button.addEventListener("click", function() {
    const message = input.value.toLowerCase();

    const findings = detectSignals(message);
    const analysis = calculateRisk(findings);

    const reasons = findings.map(
        finding => finding.category
    );

    result.innerHTML = `
    <h3 class="${analysis.level.toLowerCase().replace(" ", "-")}">
        ${analysis.level}
    </h3>

    <h2>${analysis.score}/100</h2>

    <p>${findings.length > 0 ? "Detected warning signs:" : "No suspicious signals detected."}</p>

    ${findings.length > 0 ? `
        <ul>
            ${findings.map(finding =>
                `<li>${explanations[finding.category]}</li>`
            ).join("")}
        </ul>
    ` : ""}
`;})