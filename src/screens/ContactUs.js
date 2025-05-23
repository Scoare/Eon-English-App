import { useState } from "react";
import { composeAsync } from "expo-mail-composer";
import Container from "../components/Container";
import InputField from "../components/inputField";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";

export const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weChatID, setWeChatID] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

  const navigation = useNavigation();

  const sendEmail = async () => {
    const newErrors = {};

    // Define errors
    newErrors.firstName = [
      { condition: firstName.length == 0, result: "First Name is required" },
      {
        condition: firstName.length > 50,
        result: "Field cannot be longer than 50 characters",
      },
    ];
    newErrors.lastName = [
      { condition: lastName.length == 0, result: "Last Name is required" },
      {
        condition: lastName.length > 50,
        result: "Field cannot be longer than 50 characters",
      },
    ];
    newErrors.weChatID = [
      { condition: weChatID.length == 0, result: "WeChat ID is required" },
      {
        condition: weChatID.length < 3,
        result: "WeChat ID must be longer than 3 characters",
      },
      {
        condition: weChatID.length > 20,
        result: "WeChat ID cannot be longer than 20 characters",
      },
    ];
    newErrors.subject = [
      { condition: subject.length == 0, result: "Subject is required" },
      {
        condition: subject.length > 50,
        result: "Field cannot be longer than 50 characters",
      },
    ];
    newErrors.message = [
      { condition: message.length == 0, result: "Message is required" },
    ];

    for (const field in newErrors) {
      for (const error in newErrors[field]) {
        if (newErrors[field][error].condition) {
          setErrors(newErrors);
          return;
        }
      }
    }

    try {
      await composeAsync({
        recipients: ["eonenglishus@gmail.com"],
        subject: subject,
        body: `Dear Eon English,\n\n${message}\n\nBest\n\n${firstName} ${lastName}.\n\nWeChat ID: ${weChatID}`,
      }).then(() => {
        Alert.alert("Sent!", "The form has been sent.", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("HomeStack");
            },
          },
        ]);
      });
    } catch {
      Alert.alert("Failed", "The form has not been sent.", { text: "OK" });
    }
  };

  return (
    <ScrollView>
      <Container>
        <InputField
          title={t("contactUs.firstNameLabel")}
          placeholderText={t("contactUs.firstNameInput")}
          value={firstName}
          onChangeText={setFirstName}
          conditions={errors.firstName}
          style={{ marginBottom: 20 }}
        />
        <InputField
          title={t("contactUs.lastNameLabel")}
          placeholderText={t("contactUs.lastNameInput")}
          value={lastName}
          onChangeText={setLastName}
          conditions={errors.lastName}
          style={{ marginBottom: 20 }}
        />
        <InputField
          title={t("contactUs.weChatIDLabel")}
          placeholderText={t("contactUs.weChatIDInput")}
          value={weChatID}
          onChangeText={setWeChatID}
          conditions={errors.weChatID}
          style={{ marginBottom: 20 }}
        />
        <InputField
          title={t("contactUs.subjectLabel")}
          placeholderText={t("contactUs.subjectInput")}
          value={subject}
          onChangeText={setSubject}
          conditions={errors.subject}
          style={{ marginBottom: 20 }}
        />
        <InputField
          title={t("contactUs.messageLabel")}
          placeholderText={t("contactUs.messageInput")}
          value={message}
          onChangeText={setMessage}
          style={styles.messageInput}
          conditions={errors.message}
          multiline={true}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={sendEmail}>
          <Text style={styles.buttonText}>{t("common.submitBtn")}</Text>
        </TouchableOpacity>
        <View style={{ paddingBottom: 40 }} />
      </Container>
    </ScrollView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  title: {
    color: "#8E8E8F",
    fontSize: 42,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 40,
    alignSelf: "center",
  },
  messageInput: {
    marginBottom: 20,
    height: 100, // adjust height for multiline input
    backgroundColor: "#f5f5f5",
  },
  buttonContainer: {
    backgroundColor: "#2D93F5",
    width: "100%",
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
