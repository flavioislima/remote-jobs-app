import React from "react";
import { View, TouchableOpacity, StyleSheet, Share } from "react-native";
import moment from "moment";

import Description from "./SubComponents/Description";
import Icons from "./SubComponents/Icons";
import Details from "./SubComponents/Details";
import { JobType } from "../../../types";
import JobsContext from "../../../state/JobsContext";

interface Props {
  data: JobType;
  navigate: any;
  isFavorite: boolean;
  refresh: () => void;
}

const Job: React.FC<Props> = (props: Props) => {
  const [showDescription, setShowDescription] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(props.isFavorite);
  const context = React.useContext(JobsContext);
  const handleFavorites = context.handleFavorites;

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

  const handleFavorite = () => {
    const id = props.data.id;
    handleFavorites(id);
    setIsFavorite(!isFavorite);
  };

  const {
    url,
    position,
    tags,
    dateFormated,
    type,
    salary,
    company,
    description
  } = props.data;
  let { date } = props.data;

  if (date)
    date = moment(date)
      .endOf("day")
      .fromNow();

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => setShowDescription(!showDescription)}
      >
        <Details
          position={position}
          company={company}
          date={date || dateFormated}
        />
        {description && showDescription && (
          <Description
            tags={tags}
            salary={salary}
            type={type}
            description={description}
          />
        )}
        <Icons
          handleFavorite={handleFavorite}
          handleSharing={handleSharing}
          handleUrl={openWebView}
          data={props.data}
          isFavorite={isFavorite}
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
