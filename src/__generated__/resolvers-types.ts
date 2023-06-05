import { GraphQLResolveInfo } from 'graphql';
import { ContextServer } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BestSellersSlider = {
  __typename?: 'BestSellersSlider';
  books?: Maybe<Array<Maybe<BookSlide>>>;
  last_modified?: Maybe<Scalars['String']['output']>;
};

export type BookAdditionalInfo = {
  __typename?: 'BookAdditionalInfo';
  info?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type BookDetail = {
  __typename?: 'BookDetail';
  additionalInfo?: Maybe<Array<Maybe<BookAdditionalInfo>>>;
  authors: Array<Scalars['String']['output']>;
  cover?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  subjects?: Maybe<Array<Maybe<BookSubjects>>>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type BookPreview = {
  __typename?: 'BookPreview';
  authors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  categories?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  cover?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isbn?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  pageCount?: Maybe<Scalars['Int']['output']>;
  publishedYear?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type BookSlide = {
  __typename?: 'BookSlide';
  authors: Array<Scalars['String']['output']>;
  cover: Scalars['String']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type BookSlider = {
  __typename?: 'BookSlider';
  author: Scalars['String']['output'];
  content: Array<BookSlide>;
};

export type BookSubjects = {
  __typename?: 'BookSubjects';
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Query = {
  __typename?: 'Query';
  bestSellersList?: Maybe<BestSellersSlider>;
  bookDetail?: Maybe<BookDetail>;
  booksByAuthor?: Maybe<BookSlider>;
  booksBySubject?: Maybe<Array<Maybe<BookPreview>>>;
  findBookId?: Maybe<Scalars['String']['output']>;
  searchBooks?: Maybe<Array<Maybe<BookPreview>>>;
};


export type QueryBestSellersListArgs = {
  listName: Scalars['String']['input'];
};


export type QueryBookDetailArgs = {
  id: Scalars['String']['input'];
};


export type QueryBooksByAuthorArgs = {
  author: Scalars['String']['input'];
};


export type QueryBooksBySubjectArgs = {
  subject: Scalars['String']['input'];
};


export type QueryFindBookIdArgs = {
  author: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type QuerySearchBooksArgs = {
  term: Scalars['String']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BestSellersSlider: ResolverTypeWrapper<BestSellersSlider>;
  BookAdditionalInfo: ResolverTypeWrapper<BookAdditionalInfo>;
  BookDetail: ResolverTypeWrapper<BookDetail>;
  BookPreview: ResolverTypeWrapper<BookPreview>;
  BookSlide: ResolverTypeWrapper<BookSlide>;
  BookSlider: ResolverTypeWrapper<BookSlider>;
  BookSubjects: ResolverTypeWrapper<BookSubjects>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BestSellersSlider: BestSellersSlider;
  BookAdditionalInfo: BookAdditionalInfo;
  BookDetail: BookDetail;
  BookPreview: BookPreview;
  BookSlide: BookSlide;
  BookSlider: BookSlider;
  BookSubjects: BookSubjects;
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  Query: {};
  String: Scalars['String']['output'];
}>;

export type BestSellersSliderResolvers<ContextType = ContextServer, ParentType extends ResolversParentTypes['BestSellersSlider'] = ResolversParentTypes['BestSellersSlider']> = ResolversObject<{
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['BookSlide']>>>, ParentType, ContextType>;
  last_modified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookAdditionalInfoResolvers<ContextType = ContextServer, ParentType extends ResolversParentTypes['BookAdditionalInfo'] = ResolversParentTypes['BookAdditionalInfo']> = ResolversObject<{
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookDetailResolvers<ContextType = ContextServer, ParentType extends ResolversParentTypes['BookDetail'] = ResolversParentTypes['BookDetail']> = ResolversObject<{
  additionalInfo?: Resolver<Maybe<Array<Maybe<ResolversTypes['BookAdditionalInfo']>>>, ParentType, ContextType>;
  authors?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  cover?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['BookSubjects']>>>, ParentType, ContextType>;
  subtitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookPreviewResolvers<ContextType = ContextServer, ParentType extends ResolversParentTypes['BookPreview'] = ResolversParentTypes['BookPreview']> = ResolversObject<{
  authors?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  cover?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isbn?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  pageCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  publishedYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookSlideResolvers<ContextType = ContextServer, ParentType extends ResolversParentTypes['BookSlide'] = ResolversParentTypes['BookSlide']> = ResolversObject<{
  authors?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  cover?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookSliderResolvers<ContextType = ContextServer, ParentType extends ResolversParentTypes['BookSlider'] = ResolversParentTypes['BookSlider']> = ResolversObject<{
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<Array<ResolversTypes['BookSlide']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookSubjectsResolvers<ContextType = ContextServer, ParentType extends ResolversParentTypes['BookSubjects'] = ResolversParentTypes['BookSubjects']> = ResolversObject<{
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ContextServer, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  bestSellersList?: Resolver<Maybe<ResolversTypes['BestSellersSlider']>, ParentType, ContextType, RequireFields<QueryBestSellersListArgs, 'listName'>>;
  bookDetail?: Resolver<Maybe<ResolversTypes['BookDetail']>, ParentType, ContextType, RequireFields<QueryBookDetailArgs, 'id'>>;
  booksByAuthor?: Resolver<Maybe<ResolversTypes['BookSlider']>, ParentType, ContextType, RequireFields<QueryBooksByAuthorArgs, 'author'>>;
  booksBySubject?: Resolver<Maybe<Array<Maybe<ResolversTypes['BookPreview']>>>, ParentType, ContextType, RequireFields<QueryBooksBySubjectArgs, 'subject'>>;
  findBookId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryFindBookIdArgs, 'author' | 'title'>>;
  searchBooks?: Resolver<Maybe<Array<Maybe<ResolversTypes['BookPreview']>>>, ParentType, ContextType, RequireFields<QuerySearchBooksArgs, 'term'>>;
}>;

export type Resolvers<ContextType = ContextServer> = ResolversObject<{
  BestSellersSlider?: BestSellersSliderResolvers<ContextType>;
  BookAdditionalInfo?: BookAdditionalInfoResolvers<ContextType>;
  BookDetail?: BookDetailResolvers<ContextType>;
  BookPreview?: BookPreviewResolvers<ContextType>;
  BookSlide?: BookSlideResolvers<ContextType>;
  BookSlider?: BookSliderResolvers<ContextType>;
  BookSubjects?: BookSubjectsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

