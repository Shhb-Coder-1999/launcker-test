declare module '@capgo/inappbrowser' {
  export interface OpenWebViewOptions {
    url: string;
    title?: string;
    showArrow?: boolean;
    showReloadButton?: boolean;
    toolbarType?: any;
    toolbarColor?: string;
    toolbarTextColor?: string;
    activeNativeNavigationForWebview?: boolean;
    disableGoBackOnNativeApplication?: boolean;
    buttonNearDone?: any;
    buttonNearDone2?: any;
    shareDisclaimer?: any;
    closeModal?: boolean;
    closeModalTitle?: string;
    closeModalDescription?: string;
    closeModalOk?: string;
    closeModalCancel?: string;
    isInspectable?: boolean;
    isPresentAfterPageLoad?: boolean;
    preShowScript?: string;
    headers?: Record<string, string>;
    credentials?: {
      username: string;
      password: string;
    };
    textZoom?: number;
    shareSubject?: string;
    preventDeeplink?: boolean;
    backgroundColor?: any;
    materialPicker?: boolean;
  }

  export interface InAppBrowserPlugin {
    openWebView(options: OpenWebViewOptions): Promise<void>;
    open(options: any): Promise<void>;
    close(): Promise<void>;
    setUrl(options: { url: string }): Promise<void>;
    goBack(): Promise<void>;
    addListener(eventName: string, listenerFunc: (event: any) => void): Promise<any>;
    removeAllListeners(): Promise<void>;
    postMessage(message: any): Promise<void>;
    executeScript(options: { code: string }): Promise<void>;
    getCookies(options: { url: string }): Promise<any>;
    clearCookies(options: { url: string }): Promise<void>;
    clearAllCookies(): Promise<void>;
  }

  export const InAppBrowser: InAppBrowserPlugin;
  export const ToolBarType: any;
  export const BackgroundColor: any;
} 