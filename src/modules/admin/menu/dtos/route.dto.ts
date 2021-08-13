export class RouteDto {
  routeName: string;
  name: string;
  path: string;
  componentPath?: string;
  redirect?: string;
  hidden?: boolean;
  meta?: {
    title?: string;
    icon?: string;
  };
  children?: RouteDto[];
}
