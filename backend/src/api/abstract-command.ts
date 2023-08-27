interface AbstractCommand<Props, Response> {
  call(p: Props): Response;
  [key: string]: unknown;
}

export default AbstractCommand;
