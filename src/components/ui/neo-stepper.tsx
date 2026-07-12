type StepperProps = {
  steps: string[];
  currentStep: number;
};

export default function NeoStepper({ steps, currentStep }: StepperProps) {
  return (
    <nav className="neo-stepper" aria-label="Progress">
      {steps.map((label, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        const stepClass = `neo-step ${isActive ? "neo-step--active" : ""} ${isCompleted ? "neo-step--completed" : ""}`;

        return (
          <div key={label} style={{ display: "contents" }}>
            {i > 0 && (
              <div
                className={`neo-stepper__line ${i <= currentStep ? "neo-stepper__line--active" : ""}`}
                aria-hidden="true"
              />
            )}
            <div className={stepClass} aria-current={isActive ? "step" : undefined}>
              <div className="neo-step__circle">{isCompleted ? "✓" : i + 1}</div>
              <span className="neo-step__label">{label}</span>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
