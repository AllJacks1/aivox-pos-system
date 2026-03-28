export interface NavigationLinks {
    label: string;
    href: string;
}
export interface NavigationBarProps {
    navLinks: NavigationLinks[];
}

export interface AuthenticationProps {
    onSignIn?: (email: string, password: string) => Promise<void> | void;
}