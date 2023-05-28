import {
    useQuery,
    QueryClient,
    QueryClientProvider as QueryClientProviderBase,
} from "react-query";
import supabase from "./supabase";

// React Query client
const client = new QueryClient();

/**** USERS ****/

// Fetch user data
// Note: This is called automatically in `auth.js` and data is merged into `auth.user`
export function useUser(uid) {
    // Manage data fetching with React Query: https://react-query.tanstack.com/overview
    return useQuery(
        // Unique query key: https://react-query.tanstack.com/guides/query-keys
        ["user", { uid }],
        // Query function that fetches data
        () =>
            supabase
                .from("users")
                .select(`*, customers ( * )`)
                .eq("id", uid)
                .single()
                .then(handle),
        // Only call query function if we have a `uid`
        { enabled: !!uid }
    );
}

// Fetch user data (non-hook)
// Useful if you need to fetch data from outside of a component
export function getUser(uid) {
    return supabase
        .from("users")
        .select(`*, customers ( * )`)
        .eq("id", uid)
        .single()
        .then(handle);
}

// Update an existing user
export async function updateUser(uid, data) {
    const response = await supabase
        .from("users")
        .update(data)
        .eq("id", uid)
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await client.invalidateQueries(["user", { uid }]);
    return response;
}

/**** PORTALS ****/

// Fetch portal data
export function usePortal(id) {
    return useQuery(
        ["portal", { id }],
        () =>
            supabase
                .from("portals")
                .select()
                .eq("id", id)
                .single()
                .then(handle),
        { enabled: !!id }
    );
}

// Fetch the singular portal that belongs to an admin
export function usePortalByAdmin(admin) {
    return useQuery(
        ["portal", { admin }],
        () => 
            supabase
                .from("portals")
                .select()
                .eq("id", admin.portal_id)
                .single()
                .then(handle),
        { enabled: !!admin }
    );
}

// Create a new portal
export async function createPortal(data) {
    const response = await supabase
        .from("portals")
        .insert([data])
        .select()
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await client.invalidateQueries(["portals"]);
    return response;
}

// Update an existing portal
export async function updatePortal(id, data) {
    const response = await supabase
        .from("portals")
        .update(data)
        .eq("id", id)
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await Promise.all([
        client.invalidateQueries(["portal", { id }]),
        client.invalidateQueries(["portals"]),
    ]);
    return response;
}

// Delete an existing portal
export async function deletePortal(id) {
    const response = await supabase
        .from("portals")
        .delete()
        .eq("id", id)
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await Promise.all([
        client.invalidateQueries(["portal", { id }]),
        client.invalidateQueries(["portals"]),
    ]);
    return response;
}

/**** FEEDBACK ****/

// Fetch feedback data
export function useFeedback(id) {
    return useQuery(
        ["feedback", { id }],
        () =>
            supabase
                .from("feedback")
                .select()
                .eq("id", id)
                .single()
                .then(handle),
        { enabled: !!id }
    );
}

// Fetch all feedback by portal
export function useFeedbackByPortal(portalId) {
    return useQuery(
        ["feedback", { portalId }],
        () =>
            supabase
                .from("feedback")
                .select()
                .eq("portal_id", portalId)
                .order("created_at", { ascending: false })
                .then(handle),
        { enabled: !!portalId }
    );
}

// Create a new feedback
export async function createFeedback(data) {
    const response = await supabase
        .from("feedback")
        .insert([data])
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await client.invalidateQueries(["feedback"]);
    return response;
}

// Update an existing feedback
export async function updateFeedback(id, data) {
    const response = await supabase
        .from("feedback")
        .update(data)
        .eq("id", id)
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await Promise.all([
        client.invalidateQueries(["feedback", { id }]),
        client.invalidateQueries(["feedback"]),
    ]);
    return response;
}

// Delete an existing feedback
export async function deleteFeedback(id) {
    const response = await supabase
        .from("feedback")
        .delete()
        .eq("id", id)
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await Promise.all([
        client.invalidateQueries(["feedback", { id }]),
        client.invalidateQueries(["feedback"]),
    ]);
    return response;
}






// Old Deepform Survey Stuff

/**** DEEPFORMS ****/
/* Example query functions (modify to your needs) */

// Fetch item data
export function useDeepform(id) {
    return useQuery(
        ["deepform", { id }],
        () =>
            supabase
                .from("deepforms")
                .select()
                .eq("id", id)
                .single()
                .then(handle),
        { enabled: !!id }
    );
}

// Fetch all items by owner
export function useDeepformsByOwner(owner) {
    return useQuery(
        ["deepforms", { owner }],
        () =>
            supabase
                .from("deepforms")
                .select()
                .eq("owner", owner)
                .order("created_at", { ascending: false })
                .then(handle),
        { enabled: !!owner }
    );
}

// Create a new item
export async function createDeepform(data) {
    const response = await supabase
        .from("deepforms")
        .insert([data])
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await client.invalidateQueries(["deepforms"]);
    return response;
}

// Update an item
export async function updateDeepform(id, data) {
    const response = await supabase
        .from("deepforms")
        .update(data)
        .eq("id", id)
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await Promise.all([
        client.invalidateQueries(["deepform", { id }]),
        client.invalidateQueries(["deepforms"]),
    ]);
    return response;
}

// Delete an item
export async function deleteDeepform(id) {
    const response = await supabase
        .from("deepforms")
        .delete()
        .eq("id", id)
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await Promise.all([
        client.invalidateQueries(["deepform", { id }]),
        client.invalidateQueries(["deepforms"]),
    ]);
    return response;
}

/**** SUBMISSIONS ****/
/* Example query functions (modify to your needs) */

// Fetch single submission data
export function useSubmission(id) {
    return useQuery(
        ["submission", { id }],
        () =>
            supabase
                .from("submissions")
                .select()
                .eq("id", id)
                .single()
                .then(handle),
        { enabled: !!id }
    );
}

// Fetch all submissions by Deepform
export function useSubmissionsByDeepform(deepformId) {
    return useQuery(
        ["submissions", { deepformId }],
        () =>
            supabase
                .from("submissions")
                .select()
                .eq("deepform", deepformId)
                .order("created_at", { ascending: false })
                .then(handle),
        { enabled: !!deepformId }
    );
}

// Create a new submission
export async function createSubmission(data) {
    const response = await supabase
        .from("submissions")
        .insert([data])
        .select()
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await client.invalidateQueries(["submissions"]);
    return response;
}

// Update a submission
export async function updateSubmission(id, data) {
    const response = await supabase
        .from("submissions")
        .update(data)
        .eq("id", id)
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await Promise.all([
        client.invalidateQueries(["submission", { id }]),
        client.invalidateQueries(["submissions"]),
    ]);
    return response;
}

// Delete a submission
export async function deleteSubmission(id) {
    const response = await supabase
        .from("submissions")
        .delete()
        .eq("id", id)
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await Promise.all([
        client.invalidateQueries(["submission", { id }]),
        client.invalidateQueries(["submissions"]),
    ]);
    return response;
}

/**** MESSAGES ****/

// Fetch single message data
export function useMessage(id) {
    return useQuery(
        ["message", { id }],
        () =>
            supabase
                .from("messages")
                .select()
                .eq("id", id)
                .single()
                .then(handle),
        { enabled: !!id }
    );
}

// Fetch all messages by submission
export function useMessagesBySubmission(submissionId) {
    return useQuery(
        ["messages", { submissionId }],
        () =>
            supabase
                .from("messages")
                .select()
                .eq("submission_id", submissionId)
                .order("created_at", { ascending: false })
                .then(handle),
        { enabled: !!submissionId }
    );
}

// Create a new message. Should be an object.
export async function createMessage(data) {
    const response = await supabase
        .from("messages")
        .insert([data])
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await client.invalidateQueries(["messages"]);
    return response;
}

// Create many new messages. Should be an array of objects.
export async function createMessages(data) {
    const response = await supabase.from("messages").insert(data).then(handle);
    // Invalidate and refetch queries that could have old data
    await client.invalidateQueries(["messages"]);
    return response;
}

// Update a message
export async function updateMessage(id, data) {
    const response = await supabase
        .from("messages")
        .update(data)
        .eq("id", id)
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await Promise.all([
        client.invalidateQueries(["message", { id }]),
        client.invalidateQueries(["messages"]),
    ]);
    return response;
}

// Delete a message
export async function deleteMessage(id) {
    const response = await supabase
        .from("messages")
        .delete()
        .eq("id", id)
        .then(handle);
    // Invalidate and refetch queries that could have old data
    await Promise.all([
        client.invalidateQueries(["message", { id }]),
        client.invalidateQueries(["messages"]),
    ]);
    return response;
}

// /**** ITEMS ****/
// /* Example query functions (modify to your needs) */

// // Fetch item data
// export function useItem(id) {
//   return useQuery(
//     ["item", { id }],
//     () => supabase.from("items").select().eq("id", id).single().then(handle),
//     { enabled: !!id }
//   );
// }

// // Fetch all items by owner
// export function useItemsByOwner(owner) {
//   return useQuery(
//     ["items", { owner }],
//     () =>
//       supabase
//         .from("items")
//         .select()
//         .eq("owner", owner)
//         .order("createdAt", { ascending: false })
//         .then(handle),
//     { enabled: !!owner }
//   );
// }

// // Create a new item
// export async function createItem(data) {
//   const response = await supabase.from("items").insert([data]).then(handle);
//   // Invalidate and refetch queries that could have old data
//   await client.invalidateQueries(["items"]);
//   return response;
// }

// // Update an item
// export async function updateItem(id, data) {
//   const response = await supabase
//     .from("items")
//     .update(data)
//     .eq("id", id)
//     .then(handle);
//   // Invalidate and refetch queries that could have old data
//   await Promise.all([
//     client.invalidateQueries(["item", { id }]),
//     client.invalidateQueries(["items"]),
//   ]);
//   return response;
// }

// // Delete an item
// export async function deleteItem(id) {
//   const response = await supabase
//     .from("items")
//     .delete()
//     .eq("id", id)
//     .then(handle);
//   // Invalidate and refetch queries that could have old data
//   await Promise.all([
//     client.invalidateQueries(["item", { id }]),
//     client.invalidateQueries(["items"]),
//   ]);
//   return response;
// }

/**** HELPERS ****/

// Get response data or throw error if there is one
function handle(response) {
    if (response.error) throw response.error;
    return response.data;
}

// React Query context provider that wraps our app
export function QueryClientProvider(props) {
    return (
        <QueryClientProviderBase client={client}>
            {props.children}
        </QueryClientProviderBase>
    );
}
