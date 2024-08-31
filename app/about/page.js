import { CheckIcon } from "@heroicons/react/20/solid";

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    href: "#",
    priceMonthly: "$4.99",
    description:
      "Perfect for individuals or small projects with occasional transcription needs.",
    features: [
      "5 hours of audio/video transcription per month",
      "Standard turnaround time (24-48 hours)",
      "Basic text formatting",
      "Export to TXT and PDF",
      "98% accuracy guarantee",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "Professional",
    id: "tier-professional",
    href: "#",
    priceMonthly: "$10.99",
    description:
      "Ideal for professionals and businesses with regular transcription requirements.",
    features: [
      "20 hours of audio/video transcription per month",
      "Fast turnaround time (12-24 hours)",
      "Advanced text formatting and timestamps",
      "Export to TXT, PDF, and Word",
      "99% accuracy guarantee",
      "Speaker identification",
      "Priority email and chat support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "Custom",
    description: "Tailored solutions for large-scale transcription needs.",
    features: [
      "Unlimited audio/video transcription",
      "Custom turnaround times",
      "Advanced formatting and custom templates",
      "API access for integration",
      "99.9% accuracy guarantee with human review",
      "Dedicated account manager",
      "24/7 priority support",
    ],
    featured: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PricingPage = () => {
  return (
    <div className='relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl'
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className='mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30'
        />
      </div>
      <div className='mx-auto max-w-2xl text-center lg:max-w-4xl'>
        <h2 className='text-base font-semibold leading-7 text-[#172554]'>
          Pricing
        </h2>
        <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
          Choose the perfect plan for your transcription needs
        </p>
      </div>
      <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600'>
        Whether you're an individual, a growing business, or a large enterprise,
        we have a plan that's right for you. Unlock the power of accurate
        transcriptions today.
      </p>
      <div className='mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3'>
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-white shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                ? "rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none"
                : "sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <h3
              id={tier.id}
              className='text-base font-semibold leading-7 text-[#172554]'
            >
              {tier.name}
            </h3>
            <p className='mt-4 flex items-baseline gap-x-2'>
              <span className='text-5xl font-bold tracking-tight text-gray-900'>
                {tier.priceMonthly}
              </span>
              <span className='text-base text-gray-500'>/month</span>
            </p>
            <p className='mt-6 text-base leading-7 text-gray-600'>
              {tier.description}
            </p>
            <ul
              role='list'
              className='mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10'
            >
              {tier.features.map((feature) => (
                <li key={feature} className='flex gap-x-3'>
                  <CheckIcon
                    aria-hidden='true'
                    className='h-6 w-5 flex-none text-[#172554]'
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? "bg-[#172554] text-white shadow hover:bg-blue-800"
                  : "text-[#172554] ring-1 ring-inset ring-blue-200 hover:ring-blue-300",
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#172554] sm:mt-10"
              )}
            >
              {tier.name === "Enterprise" ? "Contact Sales" : "Get started"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
