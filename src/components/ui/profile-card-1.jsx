import React, { useMemo, useState } from 'react';
import { Mail, Linkedin, UserRound, ArrowUpRight } from 'lucide-react';

const isUsableLink = value => Boolean(value && value !== 'NA' && value !== '#');

const getMailHref = email => (email ? `mailto:${email}` : '#');

const SocialButton = ({ item, setHoveredItem, hoveredItem }) => (
  <div className="relative">
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-100 transition-all duration-300 ease-out hover:bg-ieee-blue group"
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      aria-label={item.label}
    >
      <item.icon
        size={20}
        className="relative z-10 text-gray-600 transition-all duration-200 ease-out group-hover:text-white"
      />
    </a>
    <Tooltip item={item} hoveredItem={hoveredItem} />
  </div>
);

const ActionButton = ({ action }) => (
  <a
    href={action.href}
    className="mt-8 flex items-center gap-2 rounded-full bg-ieee-blue px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-ieee-red active:scale-95 group"
    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
  >
    <span>{action.text}</span>
    <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:rotate-45" />
  </a>
);

const Tooltip = ({ item, hoveredItem }) => (
  <div
    role="tooltip"
    className={`absolute -top-12 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 shadow-lg transition-all duration-300 ease-out pointer-events-none ${
      hoveredItem === item.id ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
    }`}
  >
    {item.label}
    <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-gray-200 bg-white" />
  </div>
);

export const GlassmorphismProfileCard = ({
  avatarUrl,
  name,
  title,
  bio,
  socialLinks = [],
  actionButton,
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="relative w-full max-w-sm">
      <div
        className="relative flex min-h-[420px] flex-col items-center rounded-3xl border border-white/70 bg-white/75 p-8 text-center shadow-xl backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl"
      >
        <div className="mb-4 h-24 w-24 rounded-full border-2 border-white p-1 shadow-lg">
          <img
            src={avatarUrl || `https://plus.unsplash.com/premium_photo-1690571200236-0f9098fc6ca9?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            alt={`${name}'s avatar`}
            className="h-full w-full rounded-full object-cover"
            loading="lazy"
            onError={event => {
              event.currentTarget.src = `https://placehold.co/96x96/00629B/white?text=${encodeURIComponent(
                (name || 'M').charAt(0)
              )}`;
            }}
          />
        </div>

        <h3 className="text-2xl font-bold text-ieee-blue">{name}</h3>
        <p className="mt-1 text-sm font-semibold text-ieee-red">{title}</p>
        <p className="mt-4 min-h-[44px] text-sm leading-relaxed text-gray-600">{bio}</p>

        <div className="my-6 h-px w-1/2 rounded-full bg-gray-200" />

        <div className="flex items-center justify-center gap-3">
          {socialLinks.map(item => (
            <SocialButton
              key={item.id}
              item={item}
              setHoveredItem={setHoveredItem}
              hoveredItem={hoveredItem}
            />
          ))}
        </div>

        <ActionButton action={actionButton} />
      </div>

      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-ieee-blue/40 to-ieee-red/30 opacity-40 blur-2xl transition-all duration-500 ease-out" />
    </div>
  );
};

export const MemberProfileCard = ({ member }) => {
  const socialLinks = useMemo(
    () =>
      [
        member.email && {
          id: 'mail',
          icon: Mail,
          label: 'Email',
          href: getMailHref(member.email),
          external: false,
        },
        isUsableLink(member.linkedin) && {
          id: 'linkedin',
          icon: Linkedin,
          label: 'LinkedIn',
          href: member.linkedin,
          external: true,
        },
        isUsableLink(member.ieeeProfile) && {
          id: 'ieee',
          icon: UserRound,
          label: 'IEEE Profile',
          href: member.ieeeProfile,
          external: true,
        },
      ].filter(Boolean),
    [member.email, member.ieeeProfile, member.linkedin]
  );

  return (
    <GlassmorphismProfileCard
      avatarUrl={member.image}
      name={member.name}
      title={member.designation}
      bio={member.post}
      socialLinks={socialLinks}
      actionButton={{
        text: 'Contact Me',
        href: getMailHref(member.email),
      }}
    />
  );
};

export const MemberProfileCardGrid = ({ members = [] }) => {
  if (!members.length) return null;

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map(member => (
        <MemberProfileCard key={member._id || member.email || member.name} member={member} />
      ))}
    </div>
  );
};

export function Component() {
  const cardProps = {
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=192&h=192&q=80',
    name: 'Ravi Katiyar',
    title: 'Sr. Designer',
    bio: 'Building beautiful and intuitive digital experiences. Passionate about design systems and web animation.',
    socialLinks: [
      { id: 'mail', icon: Mail, label: 'Email', href: 'mailto:ravi@example.com' },
      { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: '#', external: true },
      { id: 'ieee', icon: UserRound, label: 'IEEE Profile', href: '#', external: true },
    ],
    actionButton: {
      text: 'Contact Me',
      href: 'mailto:ravi@example.com',
    },
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 font-sans transition-colors duration-500 sm:p-8">
      <GlassmorphismProfileCard {...cardProps} />
    </div>
  );
}
