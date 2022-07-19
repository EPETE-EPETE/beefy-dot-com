import React, { memo, useMemo } from 'react';
import { Groups } from '../components/MediaKit/Groups';
import { graphql } from 'gatsby';
import { MediaKitQueryResult } from '../data/queries/media-kit';
import { Inner } from '../components/Common/Inner';
import styled from '@emotion/styled';
import { theme } from '../theme';
import { Meta } from '../components/Common/Meta';

type MediaKitPageProps = {
  data: {
    allMediaKitGroupsJson: MediaKitQueryResult['allMediaKitGroupsJson'];
  };
};

const Outer = styled.div`
  padding: ${theme.spacing(7.5)} 0;
`;

const Heading = styled.h1``;

const MediaKitPage = memo<MediaKitPageProps>(function MediaKitPage({ data }) {
  const groups = useMemo(
    () => data.allMediaKitGroupsJson.edges.map(edge => edge.node),
    [data.allMediaKitGroupsJson.edges]
  );

  return (
    <>
      <Meta
        title="Media Kit"
        description="Find all of Beefy's logos and token icons. Available in SVG and PNG."
      />
      <Outer>
        <Inner>
          <Heading>Media Kit</Heading>
          <Groups groups={groups} />
        </Inner>
      </Outer>
    </>
  );
});

export const pageQuery = graphql`
  query {
    allMediaKitGroupsJson {
      edges {
        node {
          ...MediaKitFragment
        }
      }
    }
  }
`;

export default MediaKitPage;
