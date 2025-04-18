import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TagsProps {
  tags?: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.tagsView}>
        {tags.map((tag, i) => (
          <Text style={styles.tag} key={i}>
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  tagsView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 5
  },
  tag: {
    fontSize: 12,
    textTransform: 'uppercase',
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    margin: 3,
    overflow: 'hidden'
  }
});

export default Tags;
