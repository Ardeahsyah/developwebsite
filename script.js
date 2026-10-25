document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       TRAINING LAB
    ===================================== */

    const steps =
        document.querySelectorAll(".lab-step");

    const panels =
        document.querySelectorAll(".lab-panel");

    const previousButton =
        document.getElementById("previousStep");

    const nextButton =
        document.getElementById("nextStep");

    const stepIndicator =
        document.getElementById("stepIndicator");

    let currentStep = 1;

    const totalSteps = 5;


    function showStep(stepNumber) {

        currentStep = stepNumber;


        steps.forEach(function (step) {

            const stepValue =
                Number(step.dataset.step);

            step.classList.toggle(
                "active",
                stepValue === currentStep
            );

        });


        panels.forEach(function (panel) {

            const panelValue =
                Number(panel.dataset.panel);

            panel.classList.toggle(
                "active",
                panelValue === currentStep
            );

        });


        stepIndicator.textContent =
            "Step " +
            currentStep +
            " of " +
            totalSteps;


        previousButton.disabled =
            currentStep === 1;


        nextButton.textContent =
            currentStep === totalSteps
                ? "Restart ↻"
                : "Next →";

    }


    steps.forEach(function (step) {

        step.addEventListener(
            "click",
            function () {

                showStep(
                    Number(
                        this.dataset.step
                    )
                );

            }
        );

    });


    previousButton.addEventListener(
        "click",
        function () {

            if (currentStep > 1) {

                showStep(
                    currentStep - 1
                );

            }

        }
    );


    nextButton.addEventListener(
        "click",
        function () {

            if (
                currentStep <
                totalSteps
            ) {

                showStep(
                    currentStep + 1
                );

            } else {

                showStep(1);

            }

        }
    );


    showStep(1);



    /* =====================================
       PERFORMANCE CALCULATOR
    ===================================== */

    const totalStaffInput =
        document.getElementById(
            "totalStaff"
        );

    const enrolledInput =
        document.getElementById(
            "staffEnrolled"
        );

    const certifiedInput =
        document.getElementById(
            "staffCertified"
        );


    const enrolmentResult =
        document.getElementById(
            "enrolmentResult"
        );

    const certificationResult =
        document.getElementById(
            "certificationResult"
        );


    const enrolmentBar =
        document.getElementById(
            "enrolmentBar"
        );

    const certificationBar =
        document.getElementById(
            "certificationBar"
        );


    function calculatePerformance() {

        let total =
            Number(
                totalStaffInput.value
            );

        let enrolled =
            Number(
                enrolledInput.value
            );

        let certified =
            Number(
                certifiedInput.value
            );


        if (
            !Number.isFinite(total) ||
            total <= 0
        ) {

            total = 1;

        }


        enrolled =
            Math.max(
                0,
                Math.min(
                    enrolled,
                    total
                )
            );


        certified =
            Math.max(
                0,
                Math.min(
                    certified,
                    total
                )
            );


        enrolledInput.max = total;
        certifiedInput.max = total;


        const enrolmentPercentage =
            (enrolled / total)
            * 100;


        const certificationPercentage =
            (certified / total)
            * 100;


        enrolmentResult.textContent =
            formatPercentage(
                enrolmentPercentage
            );


        certificationResult.textContent =
            formatPercentage(
                certificationPercentage
            );


        enrolmentBar.style.width =
            enrolmentPercentage +
            "%";


        certificationBar.style.width =
            certificationPercentage +
            "%";

    }


    function formatPercentage(value) {

        const rounded =
            Math.round(
                value * 10
            ) / 10;


        return (
            Number.isInteger(
                rounded
            )
                ? rounded
                : rounded.toFixed(1)
        ) + "%";

    }


    totalStaffInput.addEventListener(
        "input",
        calculatePerformance
    );


    enrolledInput.addEventListener(
        "input",
        calculatePerformance
    );


    certifiedInput.addEventListener(
        "input",
        calculatePerformance
    );


    calculatePerformance();

});
