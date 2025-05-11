module.exports = {
    default: {
        require: [
            "tests/automation/step_definitions/**/*.cjs",
            "tests/automation/support/**/*.cjs"
        ],
        paths: [
            "tests/automation/features/**/*.feature"
        ],
        format: [
            "progress", 
            "html:tests/automation/reports/cucumber-report.html",
            "json:tests/automation/reports/cucumber-report.json"
        ]
    }
};
