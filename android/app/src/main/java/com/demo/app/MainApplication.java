package com.demo.app;

import androidx.multidex.MultiDexApplication;
import androidx.multidex.MultiDex;

public class MainApplication extends MultiDexApplication {
    @Override
    public void onCreate() {
        super.onCreate();
    }
    
    @Override
    protected void attachBaseContext(android.content.Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }
} 