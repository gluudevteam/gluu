import React from 'react'

const PricingPlan = ({
    title,
    price,
    period = '/mo',
    description,
    features = [],
    buttonText,
    highlighted,
    onClick,
    onButtonClick
}) => {
    return (
        <div
            className={`w-full md:w-[350px] transition-transform duration-200 rounded-xl p-6 bg-[#181828] border ${highlighted
                ? 'border-purple-500 scale-105 shadow-lg'
                : 'border-[#232336]'
                } cursor-pointer`}
            onClick={onClick}
        >
            <div className="text-sm font-semibold text-purple-400 mb-2">{title}</div>
            <div className="flex items-end mb-2">
                <span className="text-4xl font-bold text-white">{price}</span>
                <span className="text-base text-gray-400 ml-1">{period}</span>
            </div>
            <div className="text-gray-300 mb-4">{description}</div>
            <ul className="mb-6 space-y-2">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-200">
                        <span className="text-purple-400 mr-2">✔</span>
                        {feature}
                    </li>
                ))}
            </ul>
            <button
                className={`w-full bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 mt-8 shadow-md transition cursor-pointer
                    ${!highlighted ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
                `}
                disabled={!highlighted}
                onClick={e => {
                    e.stopPropagation(); // prevent card selection
                    if (highlighted && onButtonClick) onButtonClick();
                }}
            >
                {buttonText}
            </button>
        </div>
    )
}

export default PricingPlan