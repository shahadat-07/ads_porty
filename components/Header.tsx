import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../public/images/Earn Into Logo.png";

interface HeaderProps {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl: string;
}

const Header: React.FC<HeaderProps> = ({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) => {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        {/* <Image
                    className="-mt-10 md:-mt-20 h-[180px] w-[180px] md:h-[250px] md:w-[250px]"
                    src={Logo}
                    alt="Logo"
                    /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          zoomAndPan="magnify"
          viewBox="0 120 400 150"
          preserveAspectRatio="xMidYMid meet"
          version="1.0"
          className="w-[300px] h-[120px] md:w-[300px] md:h-[120px] mt-8"
        >
          <defs>
            <g />
            <clipPath id="25beee00a5">
              <path
                d="M 21.617188 198 L 27 198 L 27 213 L 21.617188 213 Z M 21.617188 198 "
                clipRule="nonzero"
              />
            </clipPath>
            <clipPath id="fff06f50f1">
              <path
                d="M 54 162.53125 L 83 162.53125 L 83 171 L 54 171 Z M 54 162.53125 "
                clipRule="nonzero"
              />
            </clipPath>
            <clipPath id="a5d65729f1">
              <path
                d="M 36 225 L 57 225 L 57 236.761719 L 36 236.761719 Z M 36 225 "
                clipRule="nonzero"
              />
            </clipPath>
            <clipPath id="288e39f7dc">
              <path
                d="M 21.617188 191 L 39 191 L 39 209 L 21.617188 209 Z M 21.617188 191 "
                clipRule="nonzero"
              />
            </clipPath>
            <clipPath id="e322ddd983">
              <path
                d="M 38 186 L 98.117188 186 L 98.117188 203 L 38 203 Z M 38 186 "
                clipRule="nonzero"
              />
            </clipPath>
          </defs>
          <path
            fill="#5b21b6"
            d="M 32.992188 227.738281 C 31.542969 226.792969 31.503906 226.75 30.492188 225.714844 C 30.484375 225.703125 30.476562 225.695312 30.464844 225.683594 L 29.566406 224.566406 C 28.339844 222.917969 28.316406 222.886719 27.71875 221.96875 C 26.644531 220.238281 26.625 220.203125 26.113281 219.257812 C 25.828125 218.695312 25.441406 217.945312 25.167969 217.375 C 25.75 218.570312 26.933594 219.242188 28.3125 220.023438 C 28.6875 220.910156 29.101562 221.773438 29.554688 222.613281 C 30.53125 224.441406 31.679688 226.15625 32.992188 227.738281 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <g clipPath="url(#25beee00a5)">
            <path
              fill="#5b21b6"
              d="M 26.175781 212.890625 C 23.078125 210.914062 22.625 209.453125 22.257812 208.28125 L 22.117188 207.472656 C 21.824219 205.414062 21.824219 205.414062 21.738281 204.351562 C 21.613281 202.261719 21.613281 202.261719 21.617188 201.1875 C 21.628906 200.511719 21.648438 199.609375 21.683594 198.9375 C 21.851562 200.699219 22.800781 201.558594 25.351562 202.949219 C 25.449219 203.003906 25.546875 203.058594 25.648438 203.113281 C 25.585938 204.027344 25.554688 204.949219 25.550781 205.871094 C 25.546875 208.28125 25.757812 210.632812 26.175781 212.890625 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
          <path
            fill="#5b21b6"
            d="M 30.703125 185.898438 C 29.089844 188.878906 27.839844 192.019531 26.972656 195.246094 C 23.863281 192.972656 23.074219 191.535156 23.589844 189.09375 L 23.671875 188.847656 C 24.382812 186.910156 24.382812 186.910156 24.808594 185.9375 C 25.660156 184.097656 25.675781 184.0625 26.183594 183.125 C 26.53125 182.511719 26.996094 181.703125 27.359375 181.101562 C 26.738281 182.425781 26.984375 183.421875 28.378906 184.496094 C 28.949219 184.941406 29.71875 185.398438 30.703125 185.898438 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <path
            fill="#5b21b6"
            d="M 42.484375 171.996094 C 40.046875 173.867188 37.769531 176.054688 35.707031 178.519531 C 35.554688 178.707031 35.398438 178.894531 35.25 179.082031 C 31.691406 176.363281 32.757812 174.421875 34.4375 172.726562 C 35.136719 172.128906 36.066406 171.335938 36.796875 170.785156 C 38.445312 169.585938 38.511719 169.535156 39.542969 168.878906 C 40.140625 168.519531 40.945312 168.039062 41.554688 167.695312 C 40.214844 168.5 39.777344 169.207031 39.875 169.828125 C 40.015625 170.710938 41.234375 171.421875 42.484375 171.996094 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <path
            fill="#000000"
            d="M 53.222656 167.066406 C 48.273438 167.5625 43.578125 168.476562 39.875 169.828125 C 37.65625 170.636719 35.789062 171.601562 34.4375 172.726562 C 35.136719 172.128906 36.066406 171.335938 36.796875 170.785156 C 38.445312 169.585938 38.511719 169.535156 39.542969 168.878906 C 40.140625 168.519531 40.945312 168.039062 41.554688 167.695312 C 44.292969 166.351562 48.4375 165.542969 53.089844 165.214844 C 53.0625 165.417969 53.046875 165.625 53.046875 165.835938 C 53.046875 166.261719 53.109375 166.675781 53.222656 167.066406 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <g clipPath="url(#fff06f50f1)">
            <path
              fill="#000000"
              d="M 57.550781 167.535156 C 56.609375 167.535156 55.847656 166.773438 55.847656 165.835938 C 55.847656 164.898438 56.609375 164.140625 57.550781 164.140625 C 58.492188 164.140625 59.257812 164.898438 59.257812 165.835938 C 59.257812 166.773438 58.492188 167.535156 57.550781 167.535156 Z M 82.65625 170.277344 L 82.023438 169.828125 C 77.925781 167.050781 69.3125 165.390625 60.789062 165.09375 C 60.453125 163.625 59.128906 162.527344 57.550781 162.527344 C 55.714844 162.527344 54.226562 164.011719 54.226562 165.835938 C 54.226562 167.664062 55.714844 169.144531 57.550781 169.144531 C 59.109375 169.144531 60.414062 168.082031 60.777344 166.640625 C 69.898438 166.507812 78.65625 167.746094 82.65625 170.277344 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
          <g clipPath="url(#a5d65729f1)">
            <path
              fill="#000000"
              d="M 56.769531 228.890625 C 56.515625 228.328125 56.371094 227.707031 56.371094 227.050781 C 56.371094 226.433594 56.496094 225.847656 56.722656 225.3125 C 54.582031 225.289062 52.40625 225.355469 50.246094 225.519531 C 41.019531 226.230469 33.386719 228.800781 37.410156 232.175781 C 37.972656 232.574219 38.730469 233.085938 39.304688 233.46875 C 39.84375 233.808594 40.578125 234.242188 41.128906 234.566406 C 42.675781 235.441406 44.296875 236.167969 45.980469 236.742188 C 44.015625 235.675781 43.675781 234.667969 43.734375 234.011719 C 43.964844 231.425781 49.796875 229.632812 56.769531 228.890625 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
          <path
            fill="#000000"
            d="M 60.875 228.746094 C 59.933594 228.746094 59.171875 227.988281 59.171875 227.050781 C 59.171875 226.113281 59.933594 225.351562 60.875 225.351562 C 61.816406 225.351562 62.578125 226.113281 62.578125 227.050781 C 62.578125 227.988281 61.816406 228.746094 60.875 228.746094 Z M 79.953125 231.898438 C 79.300781 229.03125 72.527344 226.671875 63.925781 225.738281 C 63.414062 224.5625 62.242188 223.742188 60.875 223.742188 C 59.039062 223.742188 57.550781 225.222656 57.550781 227.050781 C 57.550781 228.878906 59.039062 230.359375 60.875 230.359375 C 62.183594 230.359375 63.3125 229.605469 63.855469 228.511719 C 70.882812 228.492188 77.605469 229.542969 79.953125 231.898438 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <path
            fill="#000000"
            d="M 61.40625 176.765625 C 61.40625 177.175781 61.445312 177.582031 61.515625 177.976562 C 48.617188 178.378906 35.375 180.675781 28.378906 184.496094 C 25.90625 185.84375 24.214844 187.382812 23.589844 189.09375 L 23.671875 188.847656 C 24.382812 186.910156 24.382812 186.910156 24.808594 185.9375 C 25.660156 184.097656 25.675781 184.0625 26.183594 183.125 C 26.53125 182.511719 26.996094 181.703125 27.359375 181.101562 C 31.433594 175.957031 46.644531 174.125 61.65625 174.949219 C 61.492188 175.527344 61.40625 176.136719 61.40625 176.765625 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <path
            fill="#000000"
            d="M 68.222656 179.644531 C 66.625 179.644531 65.328125 178.355469 65.328125 176.765625 C 65.328125 175.175781 66.625 173.886719 68.222656 173.886719 C 69.820312 173.886719 71.113281 175.175781 71.113281 176.765625 C 71.113281 178.355469 69.820312 179.644531 68.222656 179.644531 Z M 94.921875 185.042969 C 92.839844 180.921875 84.257812 177.890625 73.832031 176.226562 C 73.558594 173.378906 71.152344 171.152344 68.222656 171.152344 C 65.109375 171.152344 62.585938 173.664062 62.585938 176.765625 C 62.585938 179.863281 65.109375 182.375 68.222656 182.375 C 70.839844 182.375 73.039062 180.597656 73.671875 178.1875 C 83.929688 178.921875 92.382812 181.128906 94.921875 185.042969 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <path
            fill="#000000"
            d="M 29.554688 222.613281 C 29.511719 222.820312 29.488281 223.035156 29.488281 223.246094 C 29.472656 224.398438 30.191406 225.335938 30.464844 225.683594 L 29.566406 224.566406 C 28.339844 222.917969 28.316406 222.886719 27.71875 221.96875 C 26.644531 220.238281 26.625 220.203125 26.113281 219.257812 C 25.828125 218.695312 25.441406 217.945312 25.167969 217.375 C 23.59375 212.164062 36.792969 209.171875 52.035156 208.890625 C 51.835938 209.527344 51.730469 210.199219 51.730469 210.894531 C 51.730469 211.789062 51.90625 212.640625 52.222656 213.421875 C 40.398438 214.832031 30.449219 218.058594 29.554688 222.613281 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <path
            fill="#000000"
            d="M 58.546875 213.773438 C 56.949219 213.773438 55.65625 212.484375 55.65625 210.894531 C 55.65625 209.304688 56.949219 208.015625 58.546875 208.015625 C 60.144531 208.015625 61.4375 209.304688 61.4375 210.894531 C 61.4375 212.484375 60.144531 213.773438 58.546875 213.773438 Z M 88.605469 214.925781 C 83.03125 211.796875 73.722656 209.9375 63.925781 209.214844 C 63.210938 206.9375 61.074219 205.285156 58.546875 205.285156 C 55.433594 205.285156 52.910156 207.796875 52.910156 210.894531 C 52.910156 213.996094 55.433594 216.507812 58.546875 216.507812 C 61.046875 216.507812 63.167969 214.882812 63.90625 212.640625 C 76.679688 212.429688 89 214.351562 92.777344 218.957031 C 92.289062 217.589844 90.804688 216.160156 88.605469 214.925781 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <g clipPath="url(#288e39f7dc)">
            <path
              fill="#000000"
              d="M 38.609375 197.992188 C 32.949219 199.269531 28.25 200.941406 25.351562 202.949219 C 23.464844 204.253906 22.339844 205.699219 22.207031 207.273438 C 22.183594 207.574219 22.207031 207.984375 22.257812 208.28125 L 22.117188 207.472656 C 21.824219 205.414062 21.824219 205.414062 21.738281 204.351562 C 21.613281 202.261719 21.613281 202.261719 21.617188 201.1875 C 21.628906 200.511719 21.648438 199.609375 21.683594 198.9375 C 22.519531 195.179688 28.917969 192.714844 37.691406 191.453125 C 37.496094 192.160156 37.390625 192.898438 37.390625 193.664062 C 37.390625 195.246094 37.835938 196.730469 38.609375 197.992188 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
          <g clipPath="url(#e322ddd983)">
            <path
              fill="#000000"
              d="M 45.789062 197.347656 C 43.746094 197.347656 42.085938 195.699219 42.085938 193.664062 C 42.085938 191.628906 43.746094 189.976562 45.789062 189.976562 C 47.832031 189.976562 49.488281 191.628906 49.488281 193.664062 C 49.488281 195.699219 47.832031 197.347656 45.789062 197.347656 Z M 97.460938 201.003906 C 92.390625 194.015625 71.019531 190.328125 52.246094 190.460938 C 51.066406 188.101562 48.617188 186.480469 45.789062 186.480469 C 41.804688 186.480469 38.574219 189.695312 38.574219 193.664062 C 38.574219 197.628906 41.804688 200.84375 45.789062 200.84375 C 49.027344 200.84375 51.769531 198.722656 52.679688 195.792969 C 71.640625 193.921875 93.304688 195.597656 98.113281 202.148438 C 97.953125 201.785156 97.691406 201.324219 97.460938 201.003906 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
          <g fill="#5b21b6" fillOpacity="1">
            <g transform="translate(108.626219, 196.124987)">
              <g>
                <path d="M 31.078125 0 L 26.96875 0 L 23.859375 -4.625 L 7.671875 -4.625 L 4.53125 0 L 0.453125 0 L 14.859375 -21.3125 L 16.65625 -21.3125 Z M 21.5625 -8.015625 L 15.75 -16.59375 L 9.9375 -8.015625 Z M 21.5625 -8.015625 " />
              </g>
            </g>
          </g>
          <g fill="#5b21b6" fillOpacity="1">
            <g transform="translate(142.914247, 196.124987)">
              <g>
                <path d="M 21.59375 0 C 23.46875 0 25.066406 -0.660156 26.390625 -1.984375 C 27.710938 -3.304688 28.375 -4.90625 28.375 -6.78125 L 28.375 -14.546875 C 28.375 -16.410156 27.710938 -18.003906 26.390625 -19.328125 C 25.066406 -20.648438 23.46875 -21.3125 21.59375 -21.3125 L 2.96875 -21.3125 L 2.96875 0 Z M 21.59375 -3.390625 L 6.359375 -3.390625 L 6.359375 -17.9375 L 21.59375 -17.9375 C 22.519531 -17.9375 23.316406 -17.601562 23.984375 -16.9375 C 24.648438 -16.28125 24.984375 -15.484375 24.984375 -14.546875 L 24.984375 -6.78125 C 24.984375 -5.832031 24.648438 -5.03125 23.984375 -4.375 C 23.316406 -3.71875 22.519531 -3.390625 21.59375 -3.390625 Z M 21.59375 -3.390625 " />
              </g>
            </g>
          </g>
          <g fill="#5b21b6" fillOpacity="1">
            <g transform="translate(176.280945, 196.124987)">
              <g>
                <path d="M 22.546875 0 L 7.3125 0 C 5.90625 0 4.707031 -0.492188 3.71875 -1.484375 C 2.726562 -2.472656 2.234375 -3.671875 2.234375 -5.078125 L 5.625 -5.078125 C 5.625 -4.617188 5.785156 -4.222656 6.109375 -3.890625 C 6.441406 -3.554688 6.84375 -3.390625 7.3125 -3.390625 L 22.546875 -3.390625 C 23.015625 -3.390625 23.410156 -3.554688 23.734375 -3.890625 C 24.066406 -4.222656 24.234375 -4.617188 24.234375 -5.078125 L 24.234375 -7.265625 C 24.234375 -7.742188 24.066406 -8.144531 23.734375 -8.46875 C 23.410156 -8.800781 23.015625 -8.96875 22.546875 -8.96875 L 7.3125 -8.96875 C 5.90625 -8.96875 4.707031 -9.460938 3.71875 -10.453125 C 2.726562 -11.453125 2.234375 -12.648438 2.234375 -14.046875 L 2.234375 -16.25 C 2.234375 -17.644531 2.726562 -18.835938 3.71875 -19.828125 C 4.707031 -20.816406 5.90625 -21.3125 7.3125 -21.3125 L 22.546875 -21.3125 C 23.941406 -21.3125 25.132812 -20.816406 26.125 -19.828125 C 27.125 -18.835938 27.625 -17.644531 27.625 -16.25 L 24.234375 -16.25 C 24.234375 -16.707031 24.066406 -17.097656 23.734375 -17.421875 C 23.410156 -17.753906 23.015625 -17.921875 22.546875 -17.921875 L 7.3125 -17.921875 C 6.84375 -17.921875 6.441406 -17.753906 6.109375 -17.421875 C 5.785156 -17.097656 5.625 -16.707031 5.625 -16.25 L 5.625 -14.046875 C 5.625 -13.578125 5.785156 -13.175781 6.109375 -12.84375 C 6.441406 -12.507812 6.84375 -12.34375 7.3125 -12.34375 L 22.546875 -12.34375 C 23.941406 -12.34375 25.132812 -11.847656 26.125 -10.859375 C 27.125 -9.867188 27.625 -8.671875 27.625 -7.265625 L 27.625 -5.078125 C 27.625 -3.671875 27.125 -2.472656 26.125 -1.484375 C 25.132812 -0.492188 23.941406 0 22.546875 0 Z M 22.546875 0 " />
              </g>
            </g>
          </g>
          <g fill="#5b21b6" fillOpacity="1">
            <g transform="translate(208.904633, 196.124987)">
              <g>
                <path d="M 6.359375 0 L 2.96875 0 L 2.96875 -21.3125 L 23.28125 -21.3125 C 24.6875 -21.3125 25.882812 -20.816406 26.875 -19.828125 C 27.875 -18.835938 28.375 -17.644531 28.375 -16.25 L 28.375 -12.78125 C 28.375 -11.375 27.875 -10.175781 26.875 -9.1875 C 25.882812 -8.195312 24.6875 -7.703125 23.28125 -7.703125 L 6.359375 -7.703125 Z M 23.28125 -11.09375 C 23.75 -11.09375 24.148438 -11.253906 24.484375 -11.578125 C 24.816406 -11.910156 24.984375 -12.3125 24.984375 -12.78125 L 24.984375 -16.25 C 24.984375 -16.707031 24.816406 -17.101562 24.484375 -17.4375 C 24.148438 -17.769531 23.75 -17.9375 23.28125 -17.9375 L 6.359375 -17.9375 L 6.359375 -11.09375 Z M 23.28125 -11.09375 " />
              </g>
            </g>
          </g>
          <g fill="#5b21b6" fillOpacity="1">
            <g transform="translate(242.271333, 196.124987)">
              <g>
                <path d="M 20.84375 0 C 22.71875 0 24.316406 -0.660156 25.640625 -1.984375 C 26.960938 -3.304688 27.625 -4.90625 27.625 -6.78125 L 27.625 -14.546875 C 27.625 -16.410156 26.960938 -18.003906 25.640625 -19.328125 C 24.316406 -20.648438 22.71875 -21.3125 20.84375 -21.3125 L 9 -21.3125 C 7.132812 -21.3125 5.539062 -20.648438 4.21875 -19.328125 C 2.894531 -18.003906 2.234375 -16.410156 2.234375 -14.546875 L 2.234375 -6.78125 C 2.234375 -4.90625 2.894531 -3.304688 4.21875 -1.984375 C 5.539062 -0.660156 7.132812 0 9 0 Z M 20.84375 -3.390625 L 9 -3.390625 C 8.0625 -3.390625 7.265625 -3.71875 6.609375 -4.375 C 5.953125 -5.03125 5.625 -5.832031 5.625 -6.78125 L 5.625 -14.546875 C 5.625 -15.484375 5.953125 -16.28125 6.609375 -16.9375 C 7.265625 -17.601562 8.0625 -17.9375 9 -17.9375 L 20.84375 -17.9375 C 21.78125 -17.9375 22.578125 -17.601562 23.234375 -16.9375 C 23.898438 -16.28125 24.234375 -15.484375 24.234375 -14.546875 L 24.234375 -6.78125 C 24.234375 -5.832031 23.898438 -5.03125 23.234375 -4.375 C 22.578125 -3.71875 21.78125 -3.390625 20.84375 -3.390625 Z M 20.84375 -3.390625 " />
              </g>
            </g>
          </g>
          <g fill="#5b21b6" fillOpacity="1">
            <g transform="translate(274.895026, 196.124987)">
              <g>
                <path d="M 28.375 0 L 24.984375 0 L 24.984375 -6 C 24.984375 -6.46875 24.816406 -6.867188 24.484375 -7.203125 C 24.148438 -7.535156 23.75 -7.703125 23.28125 -7.703125 L 6.359375 -7.703125 L 6.359375 0 L 2.96875 0 L 2.96875 -21.3125 L 23.28125 -21.3125 C 24.6875 -21.3125 25.882812 -20.816406 26.875 -19.828125 C 27.875 -18.835938 28.375 -17.644531 28.375 -16.25 L 28.375 -12.78125 C 28.375 -11.46875 27.9375 -10.335938 27.0625 -9.390625 C 27.9375 -8.429688 28.375 -7.300781 28.375 -6 Z M 23.28125 -11.09375 C 23.75 -11.09375 24.148438 -11.253906 24.484375 -11.578125 C 24.816406 -11.910156 24.984375 -12.3125 24.984375 -12.78125 L 24.984375 -16.25 C 24.984375 -16.707031 24.816406 -17.101562 24.484375 -17.4375 C 24.148438 -17.769531 23.75 -17.9375 23.28125 -17.9375 L 6.359375 -17.9375 L 6.359375 -11.09375 Z M 23.28125 -11.09375 " />
              </g>
            </g>
          </g>
          <g fill="#5b21b6" fillOpacity="1">
            <g transform="translate(308.261727, 196.124987)">
              <g>
                <path d="M 13.484375 0 L 10.09375 0 L 10.09375 -17.9375 L 0.453125 -17.9375 L 0.453125 -21.3125 L 23.140625 -21.3125 L 23.140625 -17.9375 L 13.484375 -17.9375 Z M 13.484375 0 " />
              </g>
            </g>
          </g>
          <g fill="#5b21b6" fillOpacity="1">
            <g transform="translate(334.614424, 196.124987)">
              <g>
                <path d="M 16.8125 0 L 13.421875 0 L 13.421875 -9.890625 L 0.453125 -21.3125 L 5.5625 -21.3125 L 15.09375 -12.921875 L 24.640625 -21.3125 L 29.796875 -21.3125 L 16.8125 -9.890625 Z M 16.8125 0 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(158.504773, 218.320591)">
              <g>
                <path d="M 1.78125 -2.109375 L 1.375 0 L 0.296875 0 L 2.3125 -10.5 L 4 -10.5 L 6.015625 0 L 4.84375 0 L 4.4375 -2.109375 Z M 1.9375 -3.125 L 4.28125 -3.125 L 3.09375 -9.1875 Z M 1.9375 -3.125 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(169.55981, 218.320591)">
              <g>
                <path d="M 3.0625 -10.5 C 3.882812 -10.5 4.484375 -10.265625 4.859375 -9.796875 C 5.242188 -9.335938 5.4375 -8.703125 5.4375 -7.890625 L 5.4375 -2.59375 C 5.4375 -1.78125 5.242188 -1.144531 4.859375 -0.6875 C 4.484375 -0.226562 3.882812 0 3.0625 0 L 0.59375 0 L 0.59375 -10.5 Z M 3.046875 -1.0625 C 3.460938 -1.0625 3.773438 -1.1875 3.984375 -1.4375 C 4.191406 -1.695312 4.296875 -2.066406 4.296875 -2.546875 L 4.296875 -7.953125 C 4.296875 -8.429688 4.191406 -8.796875 3.984375 -9.046875 C 3.773438 -9.304688 3.457031 -9.4375 3.03125 -9.4375 L 1.765625 -9.4375 L 1.765625 -1.0625 Z M 3.046875 -1.0625 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(180.224856, 218.320591)">
              <g>
                <path d="M 2.8125 -10.609375 C 3.601562 -10.609375 4.1875 -10.367188 4.5625 -9.890625 C 4.945312 -9.421875 5.140625 -8.785156 5.140625 -7.984375 L 5.140625 -7.6875 L 4.03125 -7.6875 L 4.03125 -8.046875 C 4.03125 -8.523438 3.9375 -8.894531 3.75 -9.15625 C 3.5625 -9.414062 3.253906 -9.546875 2.828125 -9.546875 C 2.410156 -9.546875 2.109375 -9.414062 1.921875 -9.15625 C 1.734375 -8.894531 1.640625 -8.53125 1.640625 -8.0625 C 1.640625 -7.664062 1.722656 -7.320312 1.890625 -7.03125 C 2.066406 -6.738281 2.285156 -6.46875 2.546875 -6.21875 C 2.804688 -5.976562 3.085938 -5.738281 3.390625 -5.5 C 3.703125 -5.269531 3.988281 -5.015625 4.25 -4.734375 C 4.507812 -4.453125 4.722656 -4.132812 4.890625 -3.78125 C 5.066406 -3.425781 5.15625 -3.003906 5.15625 -2.515625 C 5.15625 -1.710938 4.960938 -1.070312 4.578125 -0.59375 C 4.191406 -0.125 3.597656 0.109375 2.796875 0.109375 C 1.984375 0.109375 1.382812 -0.125 1 -0.59375 C 0.625 -1.070312 0.4375 -1.710938 0.4375 -2.515625 L 0.4375 -3.125 L 1.53125 -3.125 L 1.53125 -2.453125 C 1.53125 -1.972656 1.628906 -1.601562 1.828125 -1.34375 C 2.023438 -1.082031 2.335938 -0.953125 2.765625 -0.953125 C 3.179688 -0.953125 3.488281 -1.082031 3.6875 -1.34375 C 3.882812 -1.601562 3.984375 -1.972656 3.984375 -2.453125 C 3.984375 -2.847656 3.894531 -3.1875 3.71875 -3.46875 C 3.550781 -3.757812 3.335938 -4.023438 3.078125 -4.265625 C 2.816406 -4.515625 2.535156 -4.753906 2.234375 -4.984375 C 1.929688 -5.222656 1.648438 -5.484375 1.390625 -5.765625 C 1.128906 -6.046875 0.910156 -6.363281 0.734375 -6.71875 C 0.566406 -7.070312 0.484375 -7.492188 0.484375 -7.984375 C 0.484375 -8.785156 0.671875 -9.421875 1.046875 -9.890625 C 1.429688 -10.367188 2.019531 -10.609375 2.8125 -10.609375 Z M 2.8125 -10.609375 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(190.529892, 218.320591)">
              <g />
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(197.579933, 218.320591)">
              <g>
                <path d="M 2.859375 -10.609375 C 3.671875 -10.609375 4.269531 -10.367188 4.65625 -9.890625 C 5.039062 -9.410156 5.234375 -8.769531 5.234375 -7.96875 L 5.234375 -7.0625 L 4.125 -7.0625 L 4.125 -8.03125 C 4.125 -8.507812 4.023438 -8.878906 3.828125 -9.140625 C 3.640625 -9.410156 3.328125 -9.546875 2.890625 -9.546875 C 2.472656 -9.546875 2.164062 -9.410156 1.96875 -9.140625 C 1.769531 -8.878906 1.671875 -8.507812 1.671875 -8.03125 L 1.671875 -2.46875 C 1.671875 -1.988281 1.769531 -1.613281 1.96875 -1.34375 C 2.164062 -1.082031 2.472656 -0.953125 2.890625 -0.953125 C 3.328125 -0.953125 3.640625 -1.082031 3.828125 -1.34375 C 4.023438 -1.613281 4.125 -1.988281 4.125 -2.46875 L 4.125 -4.578125 L 3.046875 -4.578125 L 3.046875 -5.625 L 5.234375 -5.625 L 5.234375 -2.53125 C 5.234375 -1.726562 5.039062 -1.085938 4.65625 -0.609375 C 4.269531 -0.128906 3.671875 0.109375 2.859375 0.109375 C 2.066406 0.109375 1.476562 -0.128906 1.09375 -0.609375 C 0.707031 -1.085938 0.515625 -1.726562 0.515625 -2.53125 L 0.515625 -7.96875 C 0.515625 -8.363281 0.5625 -8.722656 0.65625 -9.046875 C 0.75 -9.378906 0.890625 -9.660156 1.078125 -9.890625 C 1.273438 -10.117188 1.519531 -10.296875 1.8125 -10.421875 C 2.113281 -10.546875 2.460938 -10.609375 2.859375 -10.609375 Z M 2.859375 -10.609375 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(208.049968, 218.320591)">
              <g>
                <path d="M 1.78125 -2.109375 L 1.375 0 L 0.296875 0 L 2.3125 -10.5 L 4 -10.5 L 6.015625 0 L 4.84375 0 L 4.4375 -2.109375 Z M 1.9375 -3.125 L 4.28125 -3.125 L 3.09375 -9.1875 Z M 1.9375 -3.125 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(219.105006, 218.320591)">
              <g>
                <path d="M 4.46875 -0.015625 L 3.34375 -0.015625 L 1.609375 -8.375 L 1.609375 0 L 0.578125 0 L 0.578125 -10.5 L 2.21875 -10.5 L 3.9375 -2.109375 L 5.609375 -10.5 L 7.25 -10.5 L 7.25 0 L 6.140625 0 L 6.140625 -8.4375 Z M 4.46875 -0.015625 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(231.675047, 218.320591)">
              <g>
                <path d="M 4.328125 -5.84375 L 4.328125 -4.796875 L 1.765625 -4.796875 L 1.765625 -1.0625 L 4.921875 -1.0625 L 4.921875 0 L 0.59375 0 L 0.59375 -10.5 L 4.921875 -10.5 L 4.921875 -9.4375 L 1.765625 -9.4375 L 1.765625 -5.84375 Z M 4.328125 -5.84375 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(241.800092, 218.320591)">
              <g>
                <path d="M 2.8125 -10.609375 C 3.601562 -10.609375 4.1875 -10.367188 4.5625 -9.890625 C 4.945312 -9.421875 5.140625 -8.785156 5.140625 -7.984375 L 5.140625 -7.6875 L 4.03125 -7.6875 L 4.03125 -8.046875 C 4.03125 -8.523438 3.9375 -8.894531 3.75 -9.15625 C 3.5625 -9.414062 3.253906 -9.546875 2.828125 -9.546875 C 2.410156 -9.546875 2.109375 -9.414062 1.921875 -9.15625 C 1.734375 -8.894531 1.640625 -8.53125 1.640625 -8.0625 C 1.640625 -7.664062 1.722656 -7.320312 1.890625 -7.03125 C 2.066406 -6.738281 2.285156 -6.46875 2.546875 -6.21875 C 2.804688 -5.976562 3.085938 -5.738281 3.390625 -5.5 C 3.703125 -5.269531 3.988281 -5.015625 4.25 -4.734375 C 4.507812 -4.453125 4.722656 -4.132812 4.890625 -3.78125 C 5.066406 -3.425781 5.15625 -3.003906 5.15625 -2.515625 C 5.15625 -1.710938 4.960938 -1.070312 4.578125 -0.59375 C 4.191406 -0.125 3.597656 0.109375 2.796875 0.109375 C 1.984375 0.109375 1.382812 -0.125 1 -0.59375 C 0.625 -1.070312 0.4375 -1.710938 0.4375 -2.515625 L 0.4375 -3.125 L 1.53125 -3.125 L 1.53125 -2.453125 C 1.53125 -1.972656 1.628906 -1.601562 1.828125 -1.34375 C 2.023438 -1.082031 2.335938 -0.953125 2.765625 -0.953125 C 3.179688 -0.953125 3.488281 -1.082031 3.6875 -1.34375 C 3.882812 -1.601562 3.984375 -1.972656 3.984375 -2.453125 C 3.984375 -2.847656 3.894531 -3.1875 3.71875 -3.46875 C 3.550781 -3.757812 3.335938 -4.023438 3.078125 -4.265625 C 2.816406 -4.515625 2.535156 -4.753906 2.234375 -4.984375 C 1.929688 -5.222656 1.648438 -5.484375 1.390625 -5.765625 C 1.128906 -6.046875 0.910156 -6.363281 0.734375 -6.71875 C 0.566406 -7.070312 0.484375 -7.492188 0.484375 -7.984375 C 0.484375 -8.785156 0.671875 -9.421875 1.046875 -9.890625 C 1.429688 -10.367188 2.019531 -10.609375 2.8125 -10.609375 Z M 2.8125 -10.609375 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(252.10513, 218.320591)">
              <g />
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(259.155165, 218.320591)">
              <g>
                <path d="M 3.125 -9.4375 C 2.664062 -9.4375 2.320312 -9.316406 2.09375 -9.078125 C 1.875 -8.835938 1.765625 -8.460938 1.765625 -7.953125 L 1.765625 -7.421875 C 1.765625 -6.972656 1.875 -6.628906 2.09375 -6.390625 C 2.3125 -6.148438 2.609375 -6.019531 2.984375 -6 L 4.171875 -6 L 4.171875 -7.171875 L 5.328125 -7.171875 L 5.328125 -6 L 5.828125 -6 L 5.828125 -4.953125 L 5.328125 -4.953125 L 5.328125 -1.328125 C 5.328125 -1.066406 5.335938 -0.828125 5.359375 -0.609375 C 5.378906 -0.398438 5.441406 -0.195312 5.546875 0 L 4.359375 0 C 4.304688 -0.125 4.265625 -0.25 4.234375 -0.375 C 4.203125 -0.5 4.179688 -0.679688 4.171875 -0.921875 C 4.015625 -0.578125 3.796875 -0.316406 3.515625 -0.140625 C 3.234375 0.0234375 2.898438 0.109375 2.515625 0.109375 C 1.859375 0.109375 1.375 -0.101562 1.0625 -0.53125 C 0.757812 -0.96875 0.609375 -1.5625 0.609375 -2.3125 L 0.609375 -3.328125 C 0.609375 -3.847656 0.707031 -4.300781 0.90625 -4.6875 C 1.101562 -5.070312 1.421875 -5.347656 1.859375 -5.515625 C 1.429688 -5.671875 1.113281 -5.9375 0.90625 -6.3125 C 0.707031 -6.6875 0.609375 -7.140625 0.609375 -7.671875 L 0.609375 -7.90625 C 0.609375 -8.75 0.8125 -9.390625 1.21875 -9.828125 C 1.625 -10.273438 2.25 -10.5 3.09375 -10.5 L 4.78125 -10.5 L 4.78125 -9.4375 Z M 3.078125 -4.953125 C 2.203125 -4.921875 1.765625 -4.390625 1.765625 -3.359375 L 1.765625 -2.40625 C 1.765625 -1.925781 1.863281 -1.5625 2.0625 -1.3125 C 2.269531 -1.070312 2.578125 -0.953125 2.984375 -0.953125 C 3.328125 -0.953125 3.601562 -1.050781 3.8125 -1.25 C 4.03125 -1.445312 4.148438 -1.75 4.171875 -2.15625 L 4.171875 -4.953125 Z M 3.078125 -4.953125 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(277.050244, 218.320591)">
              <g>
                <path d="M 4.328125 -5.84375 L 4.328125 -4.796875 L 1.765625 -4.796875 L 1.765625 -1.0625 L 4.921875 -1.0625 L 4.921875 0 L 0.59375 0 L 0.59375 -10.5 L 4.921875 -10.5 L 4.921875 -9.4375 L 1.765625 -9.4375 L 1.765625 -5.84375 Z M 4.328125 -5.84375 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(287.175289, 218.320591)">
              <g>
                <path d="M 1.78125 -2.109375 L 1.375 0 L 0.296875 0 L 2.3125 -10.5 L 4 -10.5 L 6.015625 0 L 4.84375 0 L 4.4375 -2.109375 Z M 1.9375 -3.125 L 4.28125 -3.125 L 3.09375 -9.1875 Z M 1.9375 -3.125 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(298.230327, 218.320591)">
              <g>
                <path d="M 2.9375 -10.5 C 3.769531 -10.5 4.367188 -10.289062 4.734375 -9.875 C 5.097656 -9.46875 5.28125 -8.875 5.28125 -8.09375 L 5.28125 -7.25 C 5.28125 -6.664062 5.175781 -6.191406 4.96875 -5.828125 C 4.757812 -5.472656 4.425781 -5.222656 3.96875 -5.078125 C 4.445312 -4.941406 4.785156 -4.6875 4.984375 -4.3125 C 5.191406 -3.9375 5.296875 -3.460938 5.296875 -2.890625 L 5.296875 -1.265625 C 5.296875 -1.035156 5.304688 -0.8125 5.328125 -0.59375 C 5.347656 -0.375 5.40625 -0.175781 5.5 0 L 4.3125 0 C 4.25 -0.144531 4.203125 -0.304688 4.171875 -0.484375 C 4.140625 -0.660156 4.125 -0.925781 4.125 -1.28125 L 4.125 -2.921875 C 4.125 -3.515625 3.988281 -3.921875 3.71875 -4.140625 C 3.457031 -4.367188 3.082031 -4.484375 2.59375 -4.484375 L 1.765625 -4.484375 L 1.765625 0 L 0.59375 0 L 0.59375 -10.5 Z M 2.640625 -5.546875 C 3.109375 -5.546875 3.472656 -5.644531 3.734375 -5.84375 C 3.992188 -6.039062 4.125 -6.421875 4.125 -6.984375 L 4.125 -8 C 4.125 -8.476562 4.03125 -8.835938 3.84375 -9.078125 C 3.65625 -9.316406 3.34375 -9.4375 2.90625 -9.4375 L 1.765625 -9.4375 L 1.765625 -5.546875 Z M 2.640625 -5.546875 " />
              </g>
            </g>
          </g>
          <g fill="#000000" fillOpacity="1">
            <g transform="translate(308.865367, 218.320591)">
              <g>
                <path d="M 1.640625 0 L 0.578125 0 L 0.578125 -10.5 L 2.0625 -10.5 L 4.5 -2.90625 L 4.5 -10.5 L 5.53125 -10.5 L 5.53125 0 L 4.3125 0 L 1.640625 -8.484375 Z M 1.640625 0 " />
              </g>
            </g>
          </g>
        </svg>
      </div>
      <h2 className="text-center text-2xl md:text-3xl font-extrabold
       text-gray-900">
        {heading}
      </h2>
      <p className="text-center text-sm text-gray-600 mt-3 md:mt-5">
        {paragraph}{" "}
        <Link
          href={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
};

export default Header;
