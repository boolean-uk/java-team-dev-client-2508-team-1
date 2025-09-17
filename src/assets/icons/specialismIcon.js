// contains all specialism icons used in the app,
// add yours if you add more courses, just copy&paste and change the function name, color prop and path data, and add it to the export statement below.

// maybe add the same style as for ProfileCircle where these are used?

const SoftwareIcon = ({ color = '#28C84F', background = 'transparent'}) => {
    return (
        <svg
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{background}}
        >
            <path
                fill={color}
                d="M12 24.8998L0 12.8998L12.1 0.799805L14.25 2.9498L4.3 12.8998L14.15 22.7498L12 24.8998ZM27.9 24.9998L25.75 22.8498L35.7 12.8998L25.85 3.0498L28 0.899804L40 12.8998L27.9 24.9998Z"
            />
        </svg>
    )
};

const FrontendIcon = ({ color = '#FFFFFF', background = '#6E6EDC'}) => {
    return (
        <svg
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={color}
                d="M334-120v-60h86v-100H140q-24 0-42-18t-18-42v-440q0-24 18-42t42-18h680q24 0 42 18t18 42v440q0 24-18 42t-42 18H540v100h86v60H334ZM140-340h680v-440H140v440Zm0 0v-440 440Z"
            />
        </svg>
    )
};

const DataAnalyticsIcon = ({ color = '#FFFFFF', background = '#46A0FA'}) => {
    return (
        <svg
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={color}
                d="M109.91-240Q81-240 60.5-260.59 40-281.18 40-310.09t20.49-49.41q20.5-20.5 49.28-20.5 5.23 0 10.23.5t13 2.5l200-200q-2-8-2.5-13t-.5-10.23q0-28.78 20.59-49.28Q371.18-670 400.09-670t49.41 20.63q20.5 20.64 20.5 49.61 0 1.76-3 22.76l110 110q8-2 13-2.5t10-.5q5 0 10 .5t13 2.5l160-160q-2-8-2.5-13t-.5-10.23q0-28.78 20.59-49.28Q821.18-720 850.09-720t49.41 20.59q20.5 20.59 20.5 49.5t-20.49 49.41q-20.5 20.5-49.28 20.5-5.23 0-10.23-.5t-13-2.5L667-423q2 8 2.5 13t.5 10.23q0 28.78-20.59 49.28Q628.82-330 599.91-330t-49.41-20.49q-20.5-20.5-20.5-49.28 0-5.23.5-10.23t2.5-13L423-533q-8 2-13 2.5t-10.25.5q-1.75 0-22.75-3L177-333q2 8 2.5 13t.5 10.23q0 28.78-20.59 49.28Q138.82-240 109.91-240Z"
            />
        </svg>
    )
};


export { SoftwareIcon, FrontendIcon, DataAnalyticsIcon };