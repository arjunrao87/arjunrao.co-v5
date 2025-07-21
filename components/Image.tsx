import NextImage, { ImageProps } from 'next/image'

const Image = ({ width, height, ...rest }: ImageProps) => (
  <NextImage
    className="mx-auto max-h-96 w-full max-w-full rounded-lg object-contain sm:max-w-[672px]"
    width={width || 672}
    height={height || 384}
    {...rest}
  />
)

export default Image
