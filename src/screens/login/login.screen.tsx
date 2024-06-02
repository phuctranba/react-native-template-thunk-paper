import React, {useCallback} from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {MHS} from "constants/system/ui/sizes.ui.constant";
import {useSystemTheme} from "helpers/hooks/system.hook";
import {useAppDispatch} from "configs/store.config";
import {ITheme} from "constants/system/ui/theme.constant";
import TextInputBase from "components/base/textInput.base";
import BButton from "components/base/button.base";
import BTextMulti from "components/base/multiText.base";
import {setIsAuthenticatedThunk} from "store/reducers/user.reducer.store";
import GlobalHelper from "helpers/globalHelper";
import {ESystemStatus} from "constants/system/system.constant";


export default function LoginScreen() {
    const {styles} = useSystemTheme(createStyles);
    const [text, setText] = React.useState("");

    const dispatch = useAppDispatch();


    function login() {
        dispatch(setIsAuthenticatedThunk(true))
        GlobalHelper.showSnackBar({
            content:"Login success!!!",
            type: ESystemStatus.Success
        })
    }


    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);


    return (
        <View style={styles.container}>
            <Text variant={"displayMedium"}>{"Login"}</Text>
            <TextInputBase
                label="Email"
                value={text}
                style={styles.input}
                onChangeText={text => setText(text)}
                mode={"outlined"}
            />
            <TextInputBase
                label="Password"
                value={text}
                style={styles.input}
                onChangeText={text => setText(text)}
                mode={"outlined"}
                secureTextEntry
            />


            <BTextMulti style1={{color: "red", fontWeight: 'bold'}} style2={{color: 'green', fontSize: 20}}
                        style3={{color: "blue", fontSize: 10}}>{"hello |||every||| body"}</BTextMulti>

            <BButton onPress={login} mode={"contained"} eventKey={"login"}>
                Login
            </BButton>

        </View>
    );
};


const createStyles = (theme: ITheme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: MHS._16,
            gap: MHS._16,
            backgroundColor: theme.colors.background
        }, contentContainer: {
            flex: 1, alignItems: "center", minHeight: 100
        }, input: {
            width: "100%", borderRadius: 100
        }
    });
};

