import React from "react";
import { View, TouchableOpacity, StyleSheet, Share } from "react-native";

import Description from "./SubComponents/Description";
import Icons from "./SubComponents/Icons";
import Details from "./SubComponents/Details";
import { JobType } from "../../../types";
import JobsContext from "../../../state/JobsContext";

interface Props {
  data: JobType;
  navigate: any;
  refresh: () => void;
}

const Job: React.FC<Props> = (props: Props) => {
  const { keys, handleFavorites } = React.useContext(JobsContext);
  const [showDescription, setShowDescription] = React.useState(false);

  const openWebView = () => {
    const url = props.data.url;
    props.navigate.navigate("Browser", { url });
  };

  const handleSharing = () => {
    const { position, company, url } = props.data;
    Share.share(
      {
        message: `Here follows a great Remote Job Opportunity: 
        * Position: ${position} 
        * Company: ${company}
        * Url: ${url}`,
        url,
        title: `Remote Work App - ${position} @${company}`
      },
      {
        subject: "Job Shared from Remote Work App",
        dialogTitle: "Share a Remote Job",
        tintColor: "#4effa1"
      }
    );
  };

  const {
    url,
    position,
    tags,
    type,
    salary,
    company,
    description,
    date
  } = props.data;
  const dateFormated = new Date(date).toLocaleDateString();

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => setShowDescription(!showDescription)}
      >
        <Details position={position} company={company} date={dateFormated} />
        {description && showDescription && (
          <Description
            tags={tags}
            salary={salary}
            type={type}
            description={description}
          />
        )}
        <Icons
          handleFavorite={handleFavorites.bind(this, props.data)}
          handleSharing={handleSharing}
          handleUrl={openWebView}
          data={props.data}
          isFavorite={keys.includes(props.data.id)}
          url={url}
          position={position}
          company={company}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row"
  },
  touch: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#F6F9FE"
  }
});

export default Job;
