type Opts = {
  throwOnFail: boolean;
};

const getExecProcess = (
  cmd: string,
  runOpts: Partial<Deno.RunOptions> = {},
): Deno.Process => {
  const proc = Deno.run({
    cmd: ["sh", "-c", `${cmd}`],
    ...runOpts,
  });
  return proc;
};

const checkAndCloseProcess = async (
  proc: Deno.Process,
  opts: Partial<Opts> = {},
) => {
  const finalOpts = { throwOnFail: true, ...opts };
  const stat = await proc.status();
  proc.close();
  if (stat.code > 0 && finalOpts.throwOnFail) {
    throw new Error(`command failed with exit code ${stat.code}`);
  }
};

// exec command and return stdout as string
export const execOut = async (
  cmd: string,
  runOpts: Partial<Deno.RunOptions> = {},
): Promise<string> => {
  const proc = getExecProcess(cmd, { ...runOpts, stdout: "piped" });
  const out = await proc.output();
  await checkAndCloseProcess(proc);
  return new TextDecoder().decode(out).trim();
};
