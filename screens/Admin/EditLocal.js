import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import Imagess from "../../constants/Imagess";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as ShopActions from "../../store/actions/ShopAction";
import Shop from "../../models/Shop";
import { normalize } from "react-native-elements";

const EditLocal = (props) => {
  const shopId = props.navigation.getParam("shopId");
  const GlobalId = props.navigation.getParam("GlobalId");
  const LocalId = props.navigation.getParam("LocalId");
  const imageUrl = props.navigation.getParam("ImageUrl");
  const CatName = props.navigation.getParam("catName");
  const [image, setImage] = useState(imageUrl);
  const [name, setName] = useState(CatName);

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const dispatch = useDispatch();

  const submitHandler = (shopId, name, image, globalId, localId) => {
    if (name.trim().length === 0) {
      Alert.alert("Alert", "Name field can't be empty!");
    } else if (image.trim().length === 0) {
      Alert.alert("Alert", "Image Url field can't be empty!");
    } else {
      dispatch(ShopActions.editLocal(shopId, name, image, globalId, localId));
      props.navigation.pop();
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image === "" ? Imagess.NoImage : image }}
            style={styles.Image}
            resizeMode="contain"
          />
        </View>

        <View>
          <Text style={styles.textField}>Image Url:</Text>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Paste the Image Url here"
              placeholderTextColor="#888"
              value={image}
              onChangeText={(text) => {
                setImage(text);
              }}
              onSubmitEditing={() => setImage(image)}
              numberOfLines={1}
            />

            {image != "" && (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={Platform.OS === "android" ? "md-close" : "ios-close"}
                  style={styles.iconStyle}
                  onPress={() => {
                    setImage("");
                  }}
                  size={20}
                />
              </View>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.textField}>Local Category Name:</Text>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
              onSubmitEditing={() => setName(name)}
            />

            {name != "" && (
              <View style={styles.iconContainer}>
                <Ionicons
                  name={Platform.OS === "android" ? "md-close" : "ios-close"}
                  style={styles.iconStyle}
                  onPress={() => {
                    setName("");
                  }}
                  size={20}
                />
              </View>
            )}
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableCmp
            onPress={() =>
              submitHandler(shopId, name, image, GlobalId, LocalId)
            }
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          </TouchableCmp>
          <TouchableCmp
            onPress={() => {
              Alert.alert(
                "Are you sure ?",
                "All the products present inside this Local category will also be deleted!",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Ok",
                    onPress: () => {
                      dispatch(
                        ShopActions.removeLocal(shopId, GlobalId, LocalId)
                      );
                      props.navigation.pop();
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Delete</Text>
            </View>
          </TouchableCmp>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

EditLocal.navigationOptions =(NavData) => {
  return {
    headerTitle: "Edit Global Category",
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    margin: 10,
    width: "80%",
    aspectRatio: 1,
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  textField: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    margin: 10,
  },
  inputStyle: {
    backgroundColor: "white",
    width: "90%",
    marginHorizontal: 10,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  TextInputContainer: {
    backgroundColor: "white",
    width: "90%",
    marginHorizontal: 10,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 15,
    flexDirection: "row",
  },
  input: {
    width: "90%",
    height: "100%",
    fontSize: normalize(12)
  },
  iconStyle: {
    color: "#888",
    opacity: 0.6,
    alignSelf: "center",
  },
  iconContainer: {
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "30%",
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 5,
    marginTop: 40,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "open-sans",
    fontSize: normalize(16),
  },
});

export default EditLocal;
