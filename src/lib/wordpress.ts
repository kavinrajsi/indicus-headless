function getGraphQLURL(): string {
  const url = process.env.WORDPRESS_GRAPHQL_URL;
  if (!url) {
    throw new Error(
      "WORDPRESS_GRAPHQL_URL is not set. Add it to .env.local or Vercel Environment Variables."
    );
  }
  return url;
}

interface GraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}

export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options?: { revalidate?: number | false; tags?: string[] }
): Promise<T> {
  const { revalidate = 3600, tags } = options ?? {};

  const res = await fetch(getGraphQLURL(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: revalidate === false ? undefined : revalidate,
      tags,
    },
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("\n"));
  }

  return json.data;
}
