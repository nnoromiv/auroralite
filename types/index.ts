export interface ProviderProps {
    children: string | React.ReactNode | React.JSX.Element| React.JSX.Element[]
}

export interface NavBarProps {
    className?: string
}

export interface HeroProps {
    id?: string
}

export interface FooterProps {
    Faucet: string | undefined
    Social?: boolean
}

export interface NotificationProps {
    type: 'error' | 'success' | string
    message: string
}

export interface AirdropNavBarProps {
    handleAccount: (i: any) => void
    account: string
}

export interface FaucetProps {
    contractInstance: any
    account: string
}

export interface ButtonProps {
    style: string
    title: string
    type: 'submit' | 'button'
    onClick?: () => void
}

export interface CountDownProps {
    seconds: number
}