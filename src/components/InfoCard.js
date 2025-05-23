import PropTypes from "prop-types";
import { View, StyleSheet, Text } from "react-native";

export const InfoCard = ({
  title,
  text,
  footer,
  containerStyle,
  titleStyle,
  textStyle,
  footerStyle,
}) => {
  return (
    <View style={[styles.infoCardContainer, containerStyle]}>
      <Text style={[styles.infoCardTitle, titleStyle]}>{title}</Text>
      {text && <Text style={[styles.infoCardBody, textStyle]}>{text}</Text>}
      {footer && (
        <Text style={[styles.infoCardFooter, footerStyle]}>{footer}</Text>
      )}
    </View>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  footer: PropTypes.string,
  containerStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  textStyle: PropTypes.any,
  footerStyle: PropTypes.any,
};

export default InfoCard;

const styles = StyleSheet.create({
  infoCardContainer: {
    backgroundColor: "white",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 5px 0px",
    borderRadius: 7,
    marginBottom: 20,
    padding: 20,
  },
  infoCardTitle: {
    color: "#676767",
    fontSize: 17,
    fontWeight: "800",
  },
  infoCardBody: {
    color: "#676767",
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 22,
  },
  infoCardFooter: {
    color: "#676767",
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "right",
    fontWeight: "600",
  },
});
