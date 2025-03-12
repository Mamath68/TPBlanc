import {ButtonStyles} from "@/theme/ButtonStyles";
import {StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import {FC} from "react";

interface MainBtnProps {
    title: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
    disabled?: boolean;
    textStyle?: StyleProp<TextStyle>;
}

export const CustomButton: FC<MainBtnProps> = ({title, onPress, style, disabled, textStyle}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[ButtonStyles.btn, style]}
        >
            <Text style={[
                ButtonStyles.btnTxt,
                textStyle
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
