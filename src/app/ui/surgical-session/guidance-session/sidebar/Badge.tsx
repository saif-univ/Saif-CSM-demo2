import React, { FC } from 'react'

interface BadgeProps {
    count: string;
}

export const Badge: FC<BadgeProps> = ({ count }) => {
    return (


        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6ca985] rounded-full flex items-center justify-center text-white text-xs">
            {count}
        </span>
    )
}