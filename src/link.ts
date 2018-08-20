import { Link } from "./proto/chainscript_pb";

export function linkVersion(link: Link): string {
  return link.getVersion();
}
