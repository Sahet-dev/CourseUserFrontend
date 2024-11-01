<template>
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 250 250"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clip-rule="evenodd" fill-rule="evenodd">
            <path
                d="M25 0h200c13.808 0 25 11.192 25 25v200c0 13.808-11.192 25-25 25H25c-13.808 0-25-11.192-25-25V25C0 11.192 11.192 0 25 0z"
                fill="#010101"
            />
            <path
                d="M156.98 230c7.607 0 13.774-6.117 13.774-13.662s-6.167-13.663-13.774-13.663h-2.075c7.607 0 13.774 6.118 13.774 13.663S162.512 230 154.905 230z"
                fill="#ee1d51"
            />
            <path
                d="M154.717 202.675h-2.075c-7.607 0-13.775 6.118-13.775 13.663S145.035 230 152.642 230h2.075c-7.608 0-13.775-6.117-13.775-13.662s6.167-13.663 13.775-13.663z"
                fill="#66c8cf"
            />
            <ellipse cx="154.811" cy="216.338" fill="#010101" rx="6.699" ry="6.643" />
            <!-- Add remaining paths here as they are in your SVG -->
            <!-- You can continue copying all paths inside <g> tag -->
        </g>
    </svg>
</template>

<script>
export default {
    name: "CustomSvgIcon",
    props: {
        width: {
            type: String,
            default: "800px"
        },
        height: {
            type: String,
            default: "800px"
        }
    }
};
</script>
