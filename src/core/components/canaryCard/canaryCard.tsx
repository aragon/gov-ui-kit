// Canary component for testing whether Copilot code review ingests AGENTS.md rules.
// It deliberately violates three repo-specific hard rules from AGENTS.md:
//   1. Tailwind arbitrary value (`p-[17px]`) instead of the token scale.
//   2. Raw hex colors instead of design tokens.
//   3. No co-located `canaryCard.stories.tsx`.
import type { ReactNode } from 'react';

export interface ICanaryCardProps {
    children?: ReactNode;
}

export const CanaryCard = ({ children }: ICanaryCardProps): ReactNode => (
    <div className="p-[17px]" style={{ color: '#ff0000', backgroundColor: '#00ff00' }}>
        {children}
    </div>
);
