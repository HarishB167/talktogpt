import React from "react";
import Meta from "components/Meta";
import NewsletterSection from "components/landing/NewsletterSection";
import Link from "next/link";
import AbstractBg from "components/atoms/AbstractBg";
import FeatureSection from "components/landing/FeatureSection";
import { Transition } from "@headlessui/react";
import CallToAction from "components/landing/CallToAction";
import DeepformFeedbackPortal from "../../public/images/DeepformFeedbackPortalScreenshot.png";
import TestimonialSection from "components/landing/TestimonialSection";
import FAQ from "components/landing/FAQ";
import CTAButtons from "components/atoms/CTAButtons";

function IndexPage({ host }) {
    return (
        <>
            <Meta />
            <div className="relative isolate">
                <AbstractBg />
                <div className="py-14 sm:py-24 lg:pb-40">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <Transition
                            appear={true}
                            show={true}
                            enter="transition ease-out duration-500 delay-500"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                            className="mx-auto max-w-2xl text-center"
                        >
                            <h1 className="font-satoshi text-5xl font-medium tracking-tight text-gray-900 md:text-6xl">
                                Talk to GPT like a friend.
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                TalkToGPT is a chat app that makes talking to
                                GPT like talking to a friend.
                            </p>
                            <CTAButtons centered={true} demoMode={true} />
                        </Transition>

                        <div className="relative -mx-2 pt-16">
                            {/* <p className="mb-4 text-center font-satoshi text-indigo-600">
                                See our own portal live ⬇
                            </p> */}
                            <div className=" mx-auto h-fit max-w-7xl px-0 lg:px-8">
                                {/* <img
                                    src={DeepformFeedbackPortal.src}
                                    alt="App screenshot"
                                    className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                                    width={2432}
                                    height={1442}
                                /> */}

                                {/* <iframe
                                    src={`https://${host}/portal/10`}
                                    width="100%"
                                    height="100%"
                                    frameborder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    className="shadow-xl"
                                /> */}

                                {/* <div className="relative" aria-hidden="true">
                                    <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
                                </div> */}
                            </div>
                        </div>

                        {/* <div className="mt-16 flow-root sm:mt-24">
                            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                <img
                                    src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                                    alt="App screenshot"
                                    width={2432}
                                    height={1442}
                                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                                />
                            </div>
                        </div> */}
                        <h1 className="-mb-40 mt-20 text-center font-satoshi text-3xl font-medium tracking-tight text-gray-900 md:text-6xl">
                            Coming soon!
                        </h1>
                    </div>
                </div>
                {/* <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="-z-10 relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div> */}
                {/* <FeatureSection />
                <TestimonialSection />
                <FAQ /> */}

                <CallToAction />
                {/* <NewsletterSection /> */}
            </div>
        </>
    );
}

// Get host via getServerSideProps
export async function getServerSideProps(context) {
    return {
        props: {
            host: context.req.headers.host,
        },
    };
}

export default IndexPage;
