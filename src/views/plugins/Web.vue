<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Web</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="auto" style="text-align: center">
            <strong>Test URLs</strong>
            <ion-button @click="() => openSignSandbox()"
              >Open Sign Sandbox</ion-button
            >
            <ion-button @click="() => testWithGoogle()"
              >Test Google.com</ion-button
            >
            <ion-button @click="() => openSignSandboxFallback()"
              >Open Sign Sandbox (Fallback)</ion-button
            >
            <ion-button @click="() => openSignSandboxNoHeaders()"
              >Open Sign Sandbox (No Headers)</ion-button
            >
            <ion-button @click="() => openSignSandboxBypass()"
              >Open Sign Sandbox (Bypass)</ion-button
            >
            <ion-button @click="() => openSignSandboxExternal()"
              >Open Sign Sandbox (External)</ion-button
            >
            <ion-button @click="() => openWithProxy()"
              >Open with Proxy</ion-button
            >
            <ion-button @click="() => openWithAllOrigins()"
              >Open with AllOrigins</ion-button
            >
            <ion-button @click="() => openWithLocalWrapper()"
              >Open with Local Wrapper</ion-button
            >
            <ion-button @click="() => openWithWindowOpen()"
              >Open with window.open</ion-button
            >
            <ion-button @click="() => openWithLocationHref()"
              >Open with location.href</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { InAppBrowser } from "@capgo/inappbrowser";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCol,
  IonRow,
  IonBackButton,
  IonGrid,
  IonButtons,
} from "@ionic/vue";
import { onMounted, onUnmounted } from "vue";

// Define component name for linter
defineOptions({
  name: "WebViewPage",
});

const WEB_URL = "https://sign-sandbox.farashenasa.ir/";

// Add function to use a proxy service
async function openWithProxy() {
  const targetUrl = "https://sign-sandbox.farashenasa.ir/";
  // Use a CORS proxy to bypass restrictions
  const proxyUrl = `https://cors-anywhere.herokuapp.com/${targetUrl}`;
  console.log("Opening with proxy:", proxyUrl);

  try {
    await InAppBrowser.openWebView({
      url: proxyUrl,
      title: "Sign Sandbox (Proxy)",
      showArrow: true,
      showReloadButton: true,
      shareSubject: "Sign Sandbox",
      shareDisclaimer: {
        title: "Share",
        message: "Do you want to share this content?",
        confirmBtn: "Share",
        cancelBtn: "Cancel",
      },
    });
    console.log("Proxy opened successfully");
  } catch (error) {
    console.error("Failed to open with proxy:", error);
  }
}

// Add function to use a different proxy
async function openWithAllOrigins() {
  const targetUrl = "https://sign-sandbox.farashenasa.ir/";
  // Use allorigins proxy
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    targetUrl
  )}`;
  console.log("Opening with allorigins proxy:", proxyUrl);

  try {
    await InAppBrowser.openWebView({
      url: proxyUrl,
      title: "Sign Sandbox (AllOrigins)",
      showArrow: true,
      showReloadButton: true,
      shareSubject: "Sign Sandbox",
      shareDisclaimer: {
        title: "Share",
        message: "Do you want to share this content?",
        confirmBtn: "Share",
        cancelBtn: "Cancel",
      },
    });
    console.log("AllOrigins proxy opened successfully");
  } catch (error) {
    console.error("Failed to open with AllOrigins proxy:", error);
  }
}

// Add function to create a local HTML wrapper
async function openWithLocalWrapper() {
  const targetUrl = "https://sign-sandbox.farashenasa.ir/";
  console.log("Opening with local wrapper:", targetUrl);

  try {
    // Create a simple HTML wrapper that loads the target URL
    const wrapperHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Sign Sandbox Wrapper</title>
        <style>
          body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
          iframe { width: 100%; height: 100%; border: none; }
        </style>
      </head>
      <body>
        <iframe src="${targetUrl}" allowfullscreen></iframe>
      </body>
      </html>
    `;

    // Convert to data URL
    const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(
      wrapperHtml
    )}`;

    await InAppBrowser.openWebView({
      url: dataUrl,
      title: "Sign Sandbox (Wrapper)",
      showArrow: true,
      showReloadButton: true,
      shareSubject: "Sign Sandbox",
      shareDisclaimer: {
        title: "Share",
        message: "Do you want to share this content?",
        confirmBtn: "Share",
        cancelBtn: "Cancel",
      },
    });
    console.log("Local wrapper opened successfully");
  } catch (error) {
    console.error("Failed to open with local wrapper:", error);
  }
}

// Add function to use window.open directly
async function openWithWindowOpen() {
  const targetUrl = "https://sign-sandbox.farashenasa.ir/";
  console.log("Opening with window.open:", targetUrl);

  try {
    if (typeof window !== "undefined" && window.open) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
      console.log("Window.open opened successfully");
    } else {
      console.log("Window.open not available");
    }
  } catch (error) {
    console.error("Failed to open with window.open:", error);
  }
}

// Add function to use location.href
async function openWithLocationHref() {
  const targetUrl = "https://sign-sandbox.farashenasa.ir/";
  console.log("Opening with location.href:", targetUrl);

  try {
    if (typeof window !== "undefined" && window.location) {
      window.location.href = targetUrl;
      console.log("Location.href opened successfully");
    } else {
      console.log("Location.href not available");
    }
  } catch (error) {
    console.error("Failed to open with location.href:", error);
  }
}

async function openSignSandbox() {
  const targetUrl = "https://sign-sandbox.farashenasa.ir/";
  console.log("Opening:", targetUrl);

  try {
    await InAppBrowser.openWebView({
      url: targetUrl,
      title: "Sign Sandbox",
      showArrow: true,
      showReloadButton: true,
      // Add comprehensive headers to bypass iOS WebKit restrictions
      headers: {
        // Desktop User-Agent to match the server's expected client
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        // Accept headers matching the server response
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9,fa;q=0.8",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        // Cache control matching server
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        // Security headers to match server expectations
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Sec-CH-UA":
          '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
        "Sec-CH-UA-Mobile": "?0",
        "Sec-CH-UA-Platform": '"Windows"',
        // Connection headers
        Connection: "keep-alive",
        // Origin and referer to match server expectations
        Origin: "https://sign-sandbox.farashenasa.ir",
        Referer: "https://sign-sandbox.farashenasa.ir/",
      },
      // Add these options for better compatibility
      activeNativeNavigationForWebview: true,
      disableGoBackOnNativeApplication: false,
      // Enable inspection for debugging
      isInspectable: true,
      // Present after page load to ensure proper initialization
      isPresentAfterPageLoad: true,
      // Fix shareDisclaimer by adding shareSubject
      shareSubject: "Sign Sandbox",
      shareDisclaimer: {
        title: "Share",
        message: "Do you want to share this content?",
        confirmBtn: "Share",
        cancelBtn: "Cancel",
      },
    });
    console.log("Sign Sandbox opened successfully");
  } catch (error) {
    console.error("Failed to open Sign Sandbox:", error);
  }
}

async function testWithGoogle() {
  console.log("Testing with Google HTTPS URL");

  try {
    await InAppBrowser.openWebView({
      url: "https://google.com",
      title: "Google HTTPS Test",
      showArrow: true,
      showReloadButton: true,
    });
    console.log("Google URL test successful");
  } catch (error) {
    console.error("Google URL test failed:", error);
  }
}

// Add fallback function with alternative headers
async function openSignSandboxFallback() {
  const targetUrl = "https://sign-sandbox.farashenasa.ir/";
  console.log("Opening with fallback headers:", targetUrl);

  try {
    await InAppBrowser.openWebView({
      url: targetUrl,
      title: "Sign Sandbox (Fallback)",
      showArrow: true,
      showReloadButton: true,
      // Alternative headers strategy - minimal headers
      headers: {
        // Desktop User-Agent to bypass mobile restrictions
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        // Minimal accept headers
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        // No cache
        "Cache-Control": "no-cache",
        // Basic security
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
      },
      // Different options for fallback
      activeNativeNavigationForWebview: false,
      disableGoBackOnNativeApplication: true,
      isInspectable: true,
      isPresentAfterPageLoad: false,
    });
    console.log("Sign Sandbox fallback opened successfully");
  } catch (error) {
    console.error("Failed to open Sign Sandbox fallback:", error);
  }
}

// Add function to test with no headers at all
async function openSignSandboxNoHeaders() {
  const targetUrl = "https://sign-sandbox.farashenasa.ir/";
  console.log("Opening with no headers:", targetUrl);

  try {
    await InAppBrowser.openWebView({
      url: targetUrl,
      title: "Sign Sandbox (No Headers)",
      showArrow: true,
      showReloadButton: true,
      // No headers at all - let the browser handle everything
      activeNativeNavigationForWebview: true,
      disableGoBackOnNativeApplication: false,
      isInspectable: true,
      // Fix shareDisclaimer
      shareSubject: "Sign Sandbox",
      shareDisclaimer: {
        title: "Share",
        message: "Do you want to share this content?",
        confirmBtn: "Share",
        cancelBtn: "Cancel",
      },
    });
    console.log("Sign Sandbox no headers opened successfully");
  } catch (error) {
    console.error("Failed to open Sign Sandbox no headers:", error);
  }
}

// Add function to try bypassing X-Frame-Options with different approach
async function openSignSandboxBypass() {
  const targetUrl = "https://sign-sandbox.farashenasa.ir/";
  console.log("Trying to bypass X-Frame-Options:", targetUrl);

  try {
    await InAppBrowser.openWebView({
      url: targetUrl,
      title: "Sign Sandbox (Bypass)",
      showArrow: true,
      showReloadButton: true,
      // Try to bypass X-Frame-Options with specific headers
      headers: {
        // Use a different User-Agent that might not trigger restrictions
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        // Try to override X-Frame-Options (though this usually doesn't work)
        "X-Frame-Options": "SAMEORIGIN",
        // Minimal headers to avoid detection
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      // Try different navigation options
      activeNativeNavigationForWebview: false,
      disableGoBackOnNativeApplication: true,
      isInspectable: true,
      isPresentAfterPageLoad: false,
      // Fix shareDisclaimer
      shareSubject: "Sign Sandbox",
      shareDisclaimer: {
        title: "Share",
        message: "Do you want to share this content?",
        confirmBtn: "Share",
        cancelBtn: "Cancel",
      },
    });
    console.log("Sign Sandbox bypass attempt opened successfully");
  } catch (error) {
    console.error("Failed to open Sign Sandbox bypass:", error);
  }
}

// Add function to open in external browser as fallback
async function openSignSandboxExternal() {
  const targetUrl = "https://sign-sandbox.farashenasa.ir/";
  console.log("Opening in external browser:", targetUrl);

  try {
    // Use the basic open method which might open in external browser
    await InAppBrowser.open({
      url: targetUrl,
    });
    console.log("Sign Sandbox opened in external browser successfully");
  } catch (error) {
    console.error("Failed to open Sign Sandbox in external browser:", error);

    // Fallback to window.open if InAppBrowser.open fails
    try {
      if (typeof window !== "undefined" && window.open) {
        window.open(targetUrl, "_blank");
        console.log("Opened using window.open fallback");
      }
    } catch (windowError) {
      console.error("Window.open fallback also failed:", windowError);
    }
  }
}

let listeners: any[] = [];

onMounted(async () => {
  console.log("mounted");

  // Store listener references for cleanup
  const messageListener = await InAppBrowser.addListener(
    "messageFromWebview",
    async (msg) => {
      console.log("MESSAGE FROM WEB VIEW", msg);

      const message = (msg.detail.message as string) ?? "";
      if (message === "close") {
        await InAppBrowser.postMessage({
          detail: {
            action: "confirmClose",
            message: "Are you sure you want to close?",
          },
        });
        console.log("confirmClose send");
      } else if (message === "closeConfirmed") {
        await InAppBrowser.close();
        console.log("close confirmed");
      }
      if (message === "clear-specific") {
        console.log("magic");
        const cookies = await InAppBrowser.getCookies({ url: WEB_URL });
        if (cookies.magicCount) {
          console.log("del magic count");
          InAppBrowser.clearCookies({ url: WEB_URL });
        }
      }
      if (message === "clear-all") {
        console.log("magic (clear all)");
        const cookies = await InAppBrowser.getCookies({ url: WEB_URL });
        if (cookies.magicCount) {
          console.log("del magic count");
          InAppBrowser.clearAllCookies();
        }
      }
    }
  );

  const buttonListener = await InAppBrowser.addListener(
    "buttonNearDoneClick",
    async () => {
      await InAppBrowser.setUrl({ url: "https://web.capgo.app/login" });
    }
  );

  const urlChangeListener = await InAppBrowser.addListener(
    "urlChangeEvent",
    (event) => {
      console.log("URL changed:", event.url);
    }
  );

  const pageLoadedListener = await InAppBrowser.addListener(
    "browserPageLoaded",
    () => {
      console.log("Page loaded");
    }
  );

  const pageErrorListener = await InAppBrowser.addListener(
    "pageLoadError",
    () => {
      console.log("Page load error");
    }
  );

  const confirmBtnListener = await InAppBrowser.addListener(
    "confirmBtnClicked",
    (event) => {
      console.log("Confirm button clicked:", event.url);
    }
  );

  // Store all listeners for cleanup
  listeners = [
    messageListener,
    buttonListener,
    urlChangeListener,
    pageLoadedListener,
    pageErrorListener,
    confirmBtnListener,
  ];
});

// Add cleanup on component unmount
onUnmounted(() => {
  console.log("Cleaning up InAppBrowser listeners");
  listeners.forEach((listener) => {
    if (listener && typeof listener.remove === "function") {
      listener.remove();
    }
  });
  listeners = [];
});
</script>
