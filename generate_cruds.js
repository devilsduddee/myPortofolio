const fs = require('fs');
const path = require('path');

const modules = [
  {
    name: 'Experience',
    lower: 'experience',
    model: 'experience',
    fields: ['companyName', 'position', 'startDate', 'endDate', 'description']
  },
  {
    name: 'Project',
    lower: 'project',
    model: 'project',
    fields: ['projectName', 'description', 'techStack', 'role', 'imageUrl', 'demoUrl', 'repositoryUrl']
  },
  {
    name: 'Achievement',
    lower: 'achievement',
    model: 'achievement',
    fields: ['title', 'date', 'description', 'certificateUrl']
  },
  {
    name: 'Contact',
    lower: 'contact',
    model: 'contact',
    fields: ['email', 'phoneNumber', 'linkedinUrl', 'githubUrl', 'personalWebsite'],
    isSingleton: true
  },
  {
    name: 'Cv',
    lower: 'cv',
    model: 'resume',
    fields: ['fileUrl'],
    isSingleton: true
  }
];

function generateRepository(mod) {
  if (mod.isSingleton) {
    return `import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class ${mod.name}Repository {
  static async get() {
    return await prisma.${mod.model}.findFirst();
  }
  static async upsert(data: any) {
    const existing = await this.get();
    if (existing) return await prisma.${mod.model}.update({ where: { id: existing.id }, data });
    return await prisma.${mod.model}.create({ data });
  }
}`;
  }

  return `import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class ${mod.name}Repository {
  static async findAll() {
    return await prisma.${mod.model}.findMany({ orderBy: { createdAt: 'desc' } });
  }
  static async findById(id: string) {
    return await prisma.${mod.model}.findUnique({ where: { id } });
  }
  static async create(data: any) {
    return await prisma.${mod.model}.create({ data });
  }
  static async update(id: string, data: any) {
    return await prisma.${mod.model}.update({ where: { id }, data });
  }
  static async delete(id: string) {
    return await prisma.${mod.model}.delete({ where: { id } });
  }
}`;
}

function generateService(mod) {
  if (mod.isSingleton) {
    return `import { ${mod.name}Repository } from '../repositories/${mod.name}Repository';
import { ${mod.name}Schema } from '../validation/schema';

export class ${mod.name}Service {
  static async get() {
    return await ${mod.name}Repository.get();
  }
  static async save(data: any) {
    const validated = ${mod.name}Schema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const result = await ${mod.name}Repository.upsert(validated.data);
      return { success: true, data: result };
    } catch (e: any) {
      return { error: e.message || 'Failed to save ${mod.lower}' };
    }
  }
}`;
  }

  return `import { ${mod.name}Repository } from '../repositories/${mod.name}Repository';
import { ${mod.name}Schema } from '../validation/schema';

export class ${mod.name}Service {
  static async getAll() { return await ${mod.name}Repository.findAll(); }
  static async getById(id: string) { return await ${mod.name}Repository.findById(id); }
  
  static async create(data: any) {
    const validated = ${mod.name}Schema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const result = await ${mod.name}Repository.create(validated.data);
      return { success: true, data: result };
    } catch (e: any) { return { error: e.message }; }
  }

  static async update(id: string, data: any) {
    const validated = ${mod.name}Schema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const result = await ${mod.name}Repository.update(id, validated.data);
      return { success: true, data: result };
    } catch (e: any) { return { error: e.message }; }
  }

  static async delete(id: string) {
    try {
      await ${mod.name}Repository.delete(id);
      return { success: true };
    } catch (e: any) { return { error: e.message }; }
  }
}`;
}

function generateActions(mod) {
  if (mod.isSingleton) {
    return `'use server';
import { ${mod.name}Service } from '../services/${mod.name}Service';
import { revalidatePath } from 'next/cache';

export async function save${mod.name}Action(data: any) {
  const result = await ${mod.name}Service.save(data);
  if (result.success) {
    revalidatePath('/admin/${mod.lower}');
    revalidatePath('/');
  }
  return result;
}`;
  }

  return `'use server';
import { ${mod.name}Service } from '../services/${mod.name}Service';
import { revalidatePath } from 'next/cache';

export async function create${mod.name}Action(data: any) {
  const result = await ${mod.name}Service.create(data);
  if (result.success) { revalidatePath('/admin/${mod.lower}'); revalidatePath('/'); }
  return result;
}
export async function update${mod.name}Action(id: string, data: any) {
  const result = await ${mod.name}Service.update(id, data);
  if (result.success) { revalidatePath('/admin/${mod.lower}'); revalidatePath('/'); }
  return result;
}
export async function delete${mod.name}Action(id: string) {
  const result = await ${mod.name}Service.delete(id);
  if (result.success) { revalidatePath('/admin/${mod.lower}'); revalidatePath('/'); }
  return result;
}`;
}

function generateSchema(mod) {
  let fieldsStr = mod.fields.map(f => `${f}: z.string().optional()`).join(',\n  ');
  return `import { z } from 'zod';\n\nexport const ${mod.name}Schema = z.object({\n  ${fieldsStr}\n});\n\nexport type ${mod.name}FormValues = z.infer<typeof ${mod.name}Schema>;`;
}

function generatePage(mod) {
  if (mod.isSingleton) {
    return `import { ${mod.name}Service } from '@/features/${mod.lower}/services/${mod.name}Service';
import { PageHeader } from '@/components/admin/PageHeader';

export default async function ${mod.name}Page() {
  const data = await ${mod.name}Service.get();
  return (
    <div>
      <PageHeader title="Manage ${mod.name}" description="Update your ${mod.lower} information." />
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <p className="text-slate-500">Form implementation goes here</p>
      </div>
    </div>
  );
}`;
  }

  return `import { ${mod.name}Service } from '@/features/${mod.lower}/services/${mod.name}Service';
import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/admin/EmptyState';
import Link from 'next/link';

export default async function ${mod.name}Page() {
  const items = await ${mod.name}Service.getAll();
  return (
    <div>
      <PageHeader 
        title="Manage ${mod.name}s" 
        description="View and manage your ${mod.lower}s."
        action={<Link href="/admin/${mod.lower}/create" className="bg-slate-900 text-white px-4 py-2 rounded-lg">Add New</Link>}
      />
      {items.length === 0 ? (
        <EmptyState title="No ${mod.lower}s found" description="Get started by creating a new ${mod.lower}." />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={\`/admin/${mod.lower}/\${item.id}/edit\`} className="text-blue-600 hover:underline mr-4">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}`;
}

modules.forEach(mod => {
  const baseDir = path.join(__dirname, 'src', 'features', mod.lower);
  ['actions', 'services', 'repositories', 'validation', 'types', 'components', 'constants'].forEach(dir => {
    fs.mkdirSync(path.join(baseDir, dir), { recursive: true });
  });

  fs.writeFileSync(path.join(baseDir, 'repositories', `${mod.name}Repository.ts`), generateRepository(mod));
  fs.writeFileSync(path.join(baseDir, 'services', `${mod.name}Service.ts`), generateService(mod));
  fs.writeFileSync(path.join(baseDir, 'actions', 'actions.ts'), generateActions(mod));
  fs.writeFileSync(path.join(baseDir, 'validation', 'schema.ts'), generateSchema(mod));


  const pageDir = path.join(__dirname, 'src', 'app', 'admin', '(dashboard)', mod.lower);
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, 'page.tsx'), generatePage(mod));
});

// Storage Service
const storageDir = path.join(__dirname, 'src', 'features', 'storage');
fs.mkdirSync(path.join(storageDir, 'repositories'), { recursive: true });
fs.mkdirSync(path.join(storageDir, 'services'), { recursive: true });

const storageRepo = `import { createClient } from '@/lib/supabase/server';
export class StorageRepository {
  static async uploadFile(bucket: string, path: string, file: File) {
    const supabase = await createClient();
    return await supabase.storage.from(bucket).upload(path, file);
  }
  static async deleteFile(bucket: string, path: string) {
    const supabase = await createClient();
    return await supabase.storage.from(bucket).remove([path]);
  }
  static async getPublicUrl(bucket: string, path: string) {
    const supabase = await createClient();
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  }
}`;

const storageService = `import { StorageRepository } from '../repositories/StorageRepository';
export class StorageService {
  static async upload(bucket: string, path: string, file: File) {
    try {
      const { data, error } = await StorageRepository.uploadFile(bucket, path, file);
      if (error) return { error: error.message };
      return { success: true, url: await StorageRepository.getPublicUrl(bucket, data.path) };
    } catch(e: any) { return { error: e.message }; }
  }
}`;

fs.writeFileSync(path.join(storageDir, 'repositories', 'StorageRepository.ts'), storageRepo);
fs.writeFileSync(path.join(storageDir, 'services', 'StorageService.ts'), storageService);

console.log('Successfully bootstrapped all CRUD modules and Storage Service!');
