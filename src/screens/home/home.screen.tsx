import React, {useRef} from "react";
import {StyleSheet, View} from "react-native";
import BText from "components/base/text.base";
import {FontSize, HS, MHS, VS} from "constants/system/ui/sizes.ui.constant";
import {ITheme} from "constants/system/ui/theme.constant";
import {useSystemTheme} from "helpers/hooks/system.hook";
import {Divider} from "react-native-paper";
import BTextMulti from "components/base/multiText.base";
import BButton from "components/base/button.base";
import BTextInput from "components/base/textInput.base";
import GlobalHelper from "helpers/globalHelper";
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from "@gorhom/bottom-sheet";
import FirebaseHelper from "helpers/firebase.helper";
import navigationHelper from "helpers/navigation.helper";
import {NAVIGATION_LOGS_BUG_SCREEN} from "constants/system/navigation.constant";


export default function HomeScreen() {
    const {styles} = useSystemTheme(createStyles)
    const bottomSheetRef = useRef<BottomSheet>(null);


    function showSnackBar() {
        GlobalHelper.showSnackBar({content: "Hello"})
    }

    return (
        <View style={styles.container}>
            <View style={styles.componentView}>
                <BText variant={"headlineMedium"}>Button</BText>
                <Divider/>
                <BButton onPress={()=>FirebaseHelper.logEventAnalytics({event:"hello"})}>Button</BButton>
                <BButton mode={"contained"} onPress={showSnackBar}>Show snackbar</BButton>
                <BButton mode={"elevated"} onPress={() => bottomSheetRef.current?.expand()}>Show bottom sheet</BButton>
                <BButton mode={"outlined"} onPress={()=> navigationHelper.navigate(NAVIGATION_LOGS_BUG_SCREEN)}>Bugs list</BButton>
                <BButton mode={"contained-tonal"}
                onPress={()=>FirebaseHelper.createLogBug("", "", "api", navigationHelper.getRouteName() || "")}>Button</BButton>
            </View>

            <View style={styles.componentView}>
                <BText variant={"headlineMedium"}>TextInput</BText>
                <Divider/>
                <BTextInput placeholder={"Textinput"}/>
                <BTextInput mode={"outlined"} placeholder={"Textinput"}/>
                <BTextInput mode={"outlined"} label={"Hello"}/>
            </View>


            <View style={styles.componentView}>
                <BText variant={"headlineMedium"}>Multi text</BText>
                <Divider/>
                <BTextMulti
                    style1={{color: 'red', fontWeight: 'bold', fontSize: FontSize.H2}}
                    style2={{color: 'green', fontWeight: '500', fontStyle: "italic"}}
                    style3={{color: 'brown', fontSize: FontSize.H3, textDecorationLine: 'line-through'}}
                >Hello |||Every||| One</BTextMulti>
            </View>






            <BottomSheet
                ref={bottomSheetRef}
                enablePanDownToClose
                index={-1}
                backdropComponent={(props) => <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0} {...props}/>}
                snapPoints={["50%"]}>
                <BottomSheetView style={styles.contentContainer}>
                    <BText variant={"headlineLarge"}>Hello guys</BText>
                </BottomSheetView>
            </BottomSheet>
        </View>

    );
};


const createStyles = (theme: ITheme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: VS._32
        },
        componentView: {
            width: '100%',
            gap: MHS._6,
            paddingHorizontal: HS._24
        },
        contentContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.infoContainer
        },
    });
};