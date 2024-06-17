import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import axios from "axios";
import {appUrlConfig} from "configs";
import ReduxHelper from "helpers/redux.helper";
import {ILoginWithPassword, IUser, IUserToken} from "models/user.model";
import ObjectHelper from "helpers/object.helper";
import DeviceInfo from "react-native-device-info";
import {Platform} from "react-native";
import {MMKV} from "react-native-mmkv";

const storageMMKV = new MMKV();

interface IInitialState {
    isAuthenticated: boolean;
    token?: string;
    refreshToken?: string;
    tokenExpires?: Date;
    user?: IUser
}

export const initialState: IInitialState = {
    isAuthenticated: false,
    user: undefined,
    token: undefined,
    refreshToken: undefined,
    tokenExpires: undefined
};

export const loginWithPasswordThunk = createAsyncThunk(
    "user/loginWithPasswordThunk",
    async (params: ILoginWithPassword) => {
        params.device_uuid = await DeviceInfo.getUniqueId();
        // params.device_signature = await getFCMTokenHelper();
        params.device_signature = "getFCMTokenHelper";
        params.device_type = Platform.OS;
        return await axios.post<IUserToken>(`${appUrlConfig.APP_MAIN_URL}/login`, ObjectHelper.removeEmptyFields(params))
    },
    {serializeError: ReduxHelper.serializeAxiosError}
);

export const user = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setIsAuthenticatedThunk: (state: IInitialState, action: { payload: boolean }) => {
            state.isAuthenticated = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addMatcher(isFulfilled(loginWithPasswordThunk), (state, action) => {
                storageMMKV.set("token", action.payload?.data?.access_token)
                return ({
                    ...state,
                    isAuthenticated: true,
                    token: action.payload?.data?.access_token,
                    refreshToken: action.payload?.data?.refresh_token,
                    tokenExpires: new Date(Number(action.payload?.data?.expires_at)),
                })
            })
    }
});

// Reducer
export const {
    setIsAuthenticatedThunk
} = user.actions;

export default user.reducer;
