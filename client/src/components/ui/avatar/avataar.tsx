import clsx from 'clsx'

import s from './avatar.module.scss'

interface AvatarProps {
  alt?: string
  className?: string
  initials?: string
  size?: number
  src?: string
}

export const Avatar: React.FC<AvatarProps> = ({ alt, className, initials, size = 50, src }) => {
  const avatarStyle = {
    fontSize: size / 2.5,
    height: size,
    width: size,
  }

  return (
    <div className={clsx(s.avatar, className)} style={avatarStyle}>
      {src ? (
        <img alt={alt} className={clsx(s.avatar, s.image)} src={src} />
      ) : (
        <div className={clsx(s.avatar, s.initials)}>{initials?.slice(0, 2).toUpperCase()}</div>
      )}
    </div>
  )
}
