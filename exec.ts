const getExecProcess = (
  cmd,
  runOpts = {},
) => {
  const proc = Deno.run({
    cmd: ["sh", "-c", `${cmd}`],
    ...runOpts,
  });
  return proc;
};

const checkAndCloseProcess = async (
  proc,
  opts = {},
) => {
  const finalOpts = { throwOnFail: true, ...opts };
  const stat = await proc.status();
  proc.close();
  if (stat.code > 0 && finalOpts.throwOnFail) {
    throw new Error(`command failed with exit code ${stat.code}`);
  }
};

export const execOut = async (
  cmd,
  runOpts = {},
) => {
  const proc = getExecProcess(cmd, { ...runOpts, stdout: "piped" });
  const out = await proc.output();
  await checkAndCloseProcess(proc);
  return new TextDecoder().decode(out).trim();
};
