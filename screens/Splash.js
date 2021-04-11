import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync()
    .catch(() => { /* reloading the app might trigger some race conditions, ignore them */ });

function AnimatedAppLoader({ children, image }) {
    const [isSplashReady, setSplashReady] = React.useState(false);

    const startAsync = React.useMemo(
        // If you use a local image with require(...), use `Asset.fromModule`
        () => () => Asset.fromModule(image).downloadAsync(),
        [image]
    );

    const onFinish = React.useMemo(() => setSplashReady(true), []);

    if (!isSplashReady) {
        console.log("AnimatedAppLoader -> isSplashReady false")
        return (
            <AppLoading
                // Instruct SplashScreen not to hide yet, we want to do this manually
                autoHideSplash={false}
                startAsync={startAsync}
                onError={console.error}
                onFinish={onFinish}
            />
        );
    }

    return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
    const animation = React.useMemo(() => new Animated.Value(1), []);
    const [isAppReady, setAppReady] = React.useState(false);
    const [isSplashAnimationComplete, setAnimationComplete] = React.useState(
        false
    );

    console.log("AnimatedSplashScreen")

    React.useEffect(() => {
        if (isAppReady) {
            console.log("AnimatedSplashScreen -> useEffect -> isAppReady True")
            Animated.timing(animation, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }).start(() => setAnimationComplete(true));
        }
    }, [isAppReady]);

    const onImageLoaded = React.useMemo(() => async () => {
        try {
            console.log("AnimatedSplashScreen -> onImageLoaded -> try")
            await SplashScreen.hideAsync();
            // Load stuff
            await Promise.all([]);
        } catch (e) {
            // handle errors
        } finally {
            setAppReady(true);
        }
    });

    return (
        <View style={{ flex: 1 }}>
            {isAppReady && children}
            {!isSplashAnimationComplete && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            alignItems: "center",
                            justifyContent: "center",
                            alignContent: "center",
                            backgroundColor: Constants.manifest.splash.backgroundColor,
                            opacity: animation,
                        },
                    ]}
                >
                    <Animated.Image
                        style={{
                            width: "50%",
                            height: "50%",
                            resizeMode: Constants.manifest.splash.resizeMode || "contain",
                            transform: [
                                {
                                    scale: animation,
                                },
                            ],
                        }}
                        source={image}
                        onLoadEnd={onImageLoaded}
                        fadeDuration={0}
                    />
                </Animated.View>
            )}
        </View>
    );
}

function MainScreen() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "plum",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text
                style={{
                    color: "black",
                    fontSize: 30,
                    marginBottom: 15,
                    fontWeight: "bold",
                }}
            >
                Pretty Cool!
      </Text>
        </View>
    );
}

export default AnimatedAppLoader
