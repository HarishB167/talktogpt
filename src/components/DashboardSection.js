import React from "react";
import Link from "next/link";
import DashboardItems from "components/DashboardItems";
import { useAuth } from "util/auth";

function DashboardSection(props) {
  const auth = useAuth();

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="p-4 w-full md:w-1/2">
            <div className="rounded border border-gray-200">
              <DashboardItems />
            </div>
          </div>
          <div className="p-4 w-full md:w-1/2">
            <div className="p-6 rounded border border-gray-200 prose prose-a:text-blue-600 max-w-none">
              <h3 className="mb-4">Deepform Dashboard</h3>
              <p>
                On your left, you can create your first Deepform by clicking "Create Deepform".
                You can give it a name and then select it or delete it.
              </p>
              <p>
                Once you create a Deepform, you can click on it to enter the Deepform's 
                individual page. We'll show you how to set up your Deepform from within there!
              </p>
              <h3 className="mb-4">Your account info</h3>
              <div>
                You are signed in as <strong>{auth.user.email}</strong>.
              </div>

              {auth.user.stripeSubscriptionId && (
                <>
                  <div>
                    You are subscribed to the{" "}
                    <strong>{auth.user.planId} plan</strong>.
                  </div>
                  <div>
                    Your plan status is{" "}
                    <strong>{auth.user.stripeSubscriptionStatus}</strong>.
                  </div>
                </>
              )}

              <div>
                You can change your account info{` `}
                {auth.user.stripeSubscriptionId && <>and plan{` `}</>}
                in{` `}
                <Link href="/settings/general">
                  <a>settings</a>
                </Link>
                .
              </div>

              {!auth.user.stripeSubscriptionId && (
                <div>
                  You can signup for a plan in{" "}
                  <Link href="/pricing">
                    <a>pricing</a>
                  </Link>
                  .
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardSection;
