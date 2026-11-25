
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
    } else {
        level = "Low Risk";
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
        <h3>${analysis.level}</h3>
        <h2>${analysis.score}/100</h2>
        <p>Detected warning signs:</p>
        <ul>
            ${reasons.map(reason => `<li>${reason}</li>`).join("")}
        </ul>
    `;
});