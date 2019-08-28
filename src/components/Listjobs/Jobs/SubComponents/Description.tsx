import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Salary from "./Salary";
import Tags from "./Tags";
import Type from "./Type";

interface Props {
  description: string;
  salary: string;
  type: string;
  tags: string[];
}

export default (props: Props) => {
  const description: string = props.description
    ? props.description
        .replace(/<(?:.|\n)*?>/gm, "")
        .replace(/&amp;/gm, "&")
        .replace(/&#8211;/gm, "-")
        .replace(
          /&rsquo;|&#8217;|&#8216;|&#8220;|&#8221;|&nbsp;|&ldquo;|&rdquo;/gm,
          '"'
        )
        .trim()
    : "Open Url for more information";

  return (
    <View style={styles.container}>
      <Text numberOfLines={10} style={styles.description}>
        {description}
      </Text>
      {props.salary && <Salary salary={props.salary} />}
      {(props.tags && <Tags tags={props.tags} />) ||
        (props.type && <Type type={props.type} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "white",
    borderBottomWidth: 5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: "95%"
  },
  description: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: "400",
    color: "black"
  }
});
