import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            {/* Pizza Hut Roof silhouette */}
            <path
                d="M2 30 C 5 20, 35 20, 38 30 L 32 30 C 30 25, 10 25, 8 30 Z"
                fill="currentColor"
            />
            <path
                d="M5 24 L 20 5 L 35 24 L 32 24 L 20 10 L 8 24 Z"
                fill="currentColor"
            />
        </svg>
    );
}
