import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function FormsHeader({
    color,
    steps,
    title,
}: {
    color: string;
    steps: { completedSteps: number; totalSteps: number };
    title: string;
}) {
    const { completedSteps, totalSteps } = steps;
    const percentage = (completedSteps / totalSteps) * 100;
    const buildStylesConfig = {
        pathColor: color,
    };
    return (
        <div className="flex flex-row justify-between p-4">
            <div className="text-2xl">{title}</div>
            <div className="flex flex-row gap-2">
                <div style={{ height: 24, width: 24 }}>
                    <CircularProgressbar
                        value={percentage}
                        strokeWidth={25}
                        styles={buildStyles(buildStylesConfig)}
                    />
                </div>
                <div>
                    {completedSteps}/{totalSteps}
                </div>
            </div>
        </div>
    );
}
