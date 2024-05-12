import { error } from 'console';
import prisma from '../db';

export const getAllUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: { updates: true },
  });

  const allUpdates = products.reduce(
    (acc, product) => [...acc, ...product.updates],
    []
  );

  res.json({ data: allUpdates });
};

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) return res.json({ error: 'Product not found' });

  const createdUpdate = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });

  res.json({ data: createdUpdate });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const allUpdates = products.reduce(
    (acc, product) => [...acc, ...product.updates],
    []
  );

  const match = allUpdates.find(update => update.id === req.params.id);

  if (!match) return res.json({ error: 'Update not found' });

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const allUpdates = products.reduce(
    (acc, product) => [...acc, ...product.updates],
    []
  );

  const match = allUpdates.find(update => update.id === req.params.id);

  if (!match) return res.json({ error: 'Update not found' });

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deletedUpdate });
};
