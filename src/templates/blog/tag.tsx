import React from "react";
import { graphql } from "gatsby";
import { Meta } from '../../components/Common/Meta';
import { ArticleGrid } from '../../components/Blog/ArticleGrid';
import { Inner } from '../../components/Common/Inner';
import styled from '@emotion/styled';
import { theme } from '../../theme';
import { ArticlePagination } from '../../components/Blog/ArticlePagination';
import { ListArticles } from '../../data/queries/list-articles';

type TagTemplateProps = {
  data: {
    allMarkdownRemark: ListArticles;
  };
  pageContext: {
    tag: string;
    limit: number;
    skip: number;
    numPages: number;
    currentPage: number;
  };
};

const Outer = styled.div`
  padding: ${theme.spacing(7.5)} 0;
`;

const Pagination = styled(ArticlePagination)`
  margin-top: ${theme.spacing(3)};
`;

const TagTemplate: React.FC<TagTemplateProps> = ({ data, pageContext }) => {
  const articles = data.allMarkdownRemark.edges.map(edge => edge.node);

  return (
    <>
      <Meta title={`Posts tagged with "${pageContext.tag}"`} description={`Articles tagged with "${pageContext.tag}"`} />
      <Outer>
        <Inner>
          <ArticleGrid articles={articles} />
          <Pagination currentPage={pageContext.currentPage} numPages={pageContext.numPages} />
        </Inner>
      </Outer>
    </>
  );
};

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $tag: String) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...ListArticleFragment
        }
      }
    }
  }
`;

export default TagTemplate;
