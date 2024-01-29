export type ThemeType = {
    info: {
        name?: string;
        version?: string;
        description?: string;
        author?: string;
        repository?: string;
        minimumCiderVersion?: string;
        tags?: string[];
    },
    style: StyleType[];
}

export type StyleType = {
    identifier?: string;
    name?: string;
    description?: string;
    file?: string;
    directives?: StyleDirectivesType;
    cfg?: StyleConfigType;
};
export type StyleDirectivesType = {
    layoutType?: "mojave" | "mavericks";
    allowCustomAccent?: boolean;
    allowCustomTint?: boolean;
};
export type StyleConfigType = {
    vibrancy?: "mica" | "tabbed" | "none";
    editorialLayout?: boolean;
    useAdaptiveColors?: boolean;
    layoutView?: "HHh LpR FFf" | "HHh LpR lFf" | "lHh LpR FFf" | "lHh LpR lFf";
    appearance?: "system" | "light" | "dark";
    chromeTopWidget?: "none" | "tabs" | "search";
};
